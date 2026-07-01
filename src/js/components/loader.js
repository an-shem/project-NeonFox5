const DEFAULT_DELAY = 180;
const DEFAULT_MIN_VISIBLE = 300;
const loaderStates = new WeakMap();

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

function createNoopTask() {
  return {
    async stop() {},
  };
}

/**
 * Starts a delayed local loader for a specific component.
 *
 * The loader is not shown for very fast operations. Once it appears, it stays
 * visible for at least `minVisible` milliseconds so it does not flash.
 */
export function beginLocalLoader(
  target,
  {
    loader = target?.querySelector('[data-local-loader]'),
    delay = DEFAULT_DELAY,
    minVisible = DEFAULT_MIN_VISIBLE,
    loadingClass = 'is-loading',
  } = {}
) {
  if (!target) return createNoopTask();

  let state = loaderStates.get(target);

  if (!state) {
    state = {
      count: 0,
      delayTimer: null,
      visible: false,
      shownAt: 0,
      loader,
      loadingClass,
    };
    loaderStates.set(target, state);
  }

  state.count += 1;
  target.setAttribute('aria-busy', 'true');

  if (state.count === 1) {
    state.loader = loader;
    state.loadingClass = loadingClass;
    state.delayTimer = window.setTimeout(() => {
      state.visible = true;
      state.shownAt = performance.now();
      target.classList.add(state.loadingClass);
      if (state.loader) state.loader.hidden = false;
    }, delay);
  }

  let stopped = false;

  return {
    async stop() {
      if (stopped) return;
      stopped = true;

      state.count = Math.max(0, state.count - 1);
      if (state.count > 0) return;

      window.clearTimeout(state.delayTimer);

      if (state.visible) {
        const elapsed = performance.now() - state.shownAt;
        const remaining = Math.max(0, minVisible - elapsed);
        if (remaining > 0) await wait(remaining);
      }

      target.classList.remove(state.loadingClass);
      target.setAttribute('aria-busy', 'false');
      if (state.loader) state.loader.hidden = true;

      loaderStates.delete(target);
    },
  };
}

/**
 * Starts a loader inside a submit button and disables it for the duration of
 * the request. The original disabled state is restored afterwards.
 */
export function beginButtonLoader(
  button,
  { delay = 120, minVisible = DEFAULT_MIN_VISIBLE } = {}
) {
  if (!button) return createNoopTask();

  const wasDisabled = button.disabled;
  button.disabled = true;

  const task = beginLocalLoader(button, {
    loader: button.querySelector('[data-button-loader]'),
    delay,
    minVisible,
    loadingClass: 'is-loading',
  });

  return {
    async stop() {
      await task.stop();
      button.disabled = wasDisabled;
    },
  };
}

/**
 * Shared loader module has no global setup. Kept for the scaffold entry point.
 */
export function initLoader() {}
