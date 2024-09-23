export function showLoadingIndicator() {
  const loadingIndicators = document.querySelectorAll('.loading-indicator');
  loadingIndicators.forEach(indicator => {
    const loader = document.createElement('span');
    loader.classList.add('loader');
    indicator.appendChild(loader);
  });
}

export function hideLoadingIndicator() {
  const loadingIndicators = document.querySelectorAll('.loading-indicator');
  loadingIndicators.forEach(indicator => {
    const loader = indicator.querySelector('.loader');
    if (loader) {
      loader.remove();
    }
  });
}