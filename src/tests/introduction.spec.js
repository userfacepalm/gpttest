describe('Habr checks', () => {
  it('should have the correct site title', async () => {
    await browser.url('https://habr.com/en/all/');
    await expect(browser).toHaveTitleContaining('All articles in a row / Habr');
  });

  it('should have a search input field', async () => {
    await browser.url('https://habr.com/en/search/');
    const searchInput = await $('//div[@name="q"]');
    await expect(searchInput).toExist();
  });

  it('should have at least 1 article', async () => {
    await browser.url('https://habr.com/en/all/');
    const articles = await $$('//div[@class="tm-article-snippet tm-article-snippet"]');
    await expect(articles).toBeElementsArrayOfSize({gte: 1});
  });

  it('top side ad block presents on main page', async () => {
    await browser.url('https://habr.com/en/all/');
    const adBlock = await $('//div[@class="tm-adfox-banner__container tm-layout-sidebar__banner tm-layout-sidebar__banner_top"]');
    await expect(adBlock).toBePresent();
  });
});
