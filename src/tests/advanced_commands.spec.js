xdescribe('Habr checks Advanced commands:', async () => {
  beforeEach(async () => {
    await browser.url('https://habr.com/en/all/');
  });

  it('should have "Habr" in the title', async () => {
    await expect(browser).toHaveTitle('All articles in a row / Habr');
  });

  it('wait profile button', async () => {
    const profileBtn = $('//div[@class="tm-dropdown__head"]');
    await profileBtn.click();
    profileBtn.waitForDisplayed({timeout: 5000, timeoutMsg: 'Expected "Profile" button to be displayed within 5s'});
    await profileBtn.click();
    await profileBtn.waitForDisplayed({timeout: 5000, timeoutMsg: 'Expected "Profile" button to be displayed within 5s'});
  });

  it('set and get value from cookies', async () => {
    await browser.url('https://habr.com/en/all/');
    await browser.waitUntil(async () => (await browser.getTitle()) === 'All articles in a row / Habr', {
      timeout: 5000,
      timeoutMsg: 'Expected title to be "All articles in a row / Habr"',
    });
    await browser.setCookies({name: 'John', value: 'Doe'});
    await browser.waitUntil(async () => (await browser.getCookies()).some((cookie) => cookie.name === 'John'), {
      timeout: 5000,
      timeoutMsg: 'Expected cookie to be set within 5s',
    });
    const cookieValue = (await browser.getCookies()).find((cookie) => cookie.name === 'John').value;
    expect(cookieValue).toEqual('Doe');
  });

  it('set and get data from local storage', async () => {
    await browser.execute(() => {
      localStorage.setItem('John1', 'Doe1');
    });
    const localStorageValue = await browser.execute(() => {
      return localStorage.getItem('John1');
    });
    await expect(localStorageValue).toEqual('Doe1');
  });
});
