xdescribe('Habr checks Basics commands', async () => {
  it('should check if search element exists', async () => {
    await browser.url('https://habr.com/en/search/');
    const searchField = $('//div[@name="q"]');
    await expect(searchField).toExist();
  });

  it('should input value in search field and click find button', async () => {
    await browser.url('https://habr.com/en/search/');
    const searchField = await $('//input[@name="q"]');
    await searchField.click();
    await searchField.setValue('webdriverio');
    const searchButton = await $('//span[@class="tm-svg-icon__wrapper tm-search__icon"]');
    await searchButton.click();
    await expect(browser).toHaveTitleContaining('Search results for «webdriverio» / Habr');
  });

  it('should wait for search field to be displayed', async () => {
    await browser.url('https://habr.com/en/search/');
    const searchField = $('//div[@name="q"]');
    searchField.waitForDisplayed();
    await expect(searchField).toBeDisplayed();
  });

  it('should wait for profile button to exist', async () => {
    await browser.url('https://habr.com/en/all/');
    const profileButton = $('//div[@class="tm-dropdown__head"]');
    profileButton.waitForExist();
    await expect(profileButton).toExist();
  });
});
