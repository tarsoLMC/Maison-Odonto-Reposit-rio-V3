const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'assets/js/maison-concierge.js'), 'utf8');

const makeNode = (dataset = {}) => ({
  dataset,
  attrs: {},
  events: {},
  tabIndex: 0,
  hidden: false,
  textContent: '',
  focused: false,
  setAttribute(name, value) { this.attrs[name] = value; },
  addEventListener(name, listener) { this.events[name] = listener; },
  focus(options) { this.focused = options?.preventScroll === true; },
  trigger(name, event = {}) {
    const e = { prevented: false, preventDefault() { this.prevented = true; }, ...event };
    if (this.events[name]) this.events[name](e);
    return e;
  }
});

function setup(hash = '') {
  const keys = ['reabilitacao', 'alinhamento', 'estetica', 'outros'];
  const tabs = keys.map(key => makeNode({ conciergeTab: key }));
  const panels = keys.map(key => makeNode({ conciergePanel: key }));
  const list = makeNode();
  const counter = makeNode();
  const root = {
    classes: [],
    classList: { add(name) { root.classes.push(name); } },
    querySelector(selector) {
      return selector === '[data-concierge-list]' ? list :
        selector === '[data-concierge-counter]' ? counter : null;
    },
    querySelectorAll(selector) {
      return selector === '[data-concierge-tab]' ? tabs :
        selector === '[data-concierge-panel]' ? panels : [];
    }
  };
  const window = makeNode();
  const location = { hash };
  vm.runInNewContext(source, {
    document: { querySelector: selector => selector === '[data-maison-concierge]' ? root : null },
    window, location, decodeURIComponent
  });
  return { root, list, tabs, panels, counter, window, location };
}

test('exibe a primeira opção e oculta os outros painéis após o enhancement', () => {
  const u = setup();
  assert.equal(u.root.classes.includes('is-enhanced'), true);
  assert.equal(u.list.attrs.role, 'tablist');
  assert.equal(u.counter.textContent, '01');
  assert.deepEqual(u.panels.map(x => x.hidden), [false, true, true, true]);
  assert.equal(u.tabs[0].attrs['aria-selected'], 'true');
  assert.equal(u.tabs[2].attrs['aria-selected'], 'false');
  assert.equal(u.tabs[0].tabIndex, 0);
  assert.equal(u.tabs[1].tabIndex, -1);
});

test('toque seleciona Outros cuidados e harmonização facial, sem trocar página', () => {
  const u = setup();
  const event = u.tabs[3].trigger('click');
  assert.equal(event.prevented, true);
  assert.deepEqual(u.panels.map(x => x.hidden), [true, true, true, false]);
  assert.equal(u.tabs[3].attrs['aria-selected'], 'true');
  assert.equal(u.counter.textContent, '04');
});

test('setas e Home/End alteram seleção com foco sem rolagem forçada', () => {
  const u = setup();
  const event = u.tabs[0].trigger('keydown', { key: 'ArrowRight' });
  assert.equal(event.prevented, true);
  assert.equal(u.tabs[1].focused, true);
  assert.equal(u.counter.textContent, '02');
  u.tabs[1].trigger('keydown', { key: 'End' });
  assert.equal(u.counter.textContent, '04');
  u.tabs[3].trigger('keydown', { key: 'Home' });
  assert.equal(u.counter.textContent, '01');
  assert.equal(u.tabs[0].attrs['aria-selected'], 'true');
});

test('links profundos abrem a categoria certa', () => {
  const u = setup('#concierge-estetica');
  assert.deepEqual(u.panels.map(x => x.hidden), [true, true, false, true]);
  u.location.hash = '#concierge-alinhamento';
  u.window.trigger('hashchange');
  assert.deepEqual(u.panels.map(x => x.hidden), [true, false, true, true]);
});
