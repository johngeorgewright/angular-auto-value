describe('autoValue', function () {

  beforeEach(function () {
    browser.get('/test/autoValueSpec.html');
  });

  var inputTests = {
        color: '#b89435',
        date: '1987-01-01',
        datetime: new Date('12/07/1987').toString(),
        datetimeLocal: '1987-12-07T00:00',
        email: 'mung@face.com',
        month: '2013-01',
        number: '5555',
        password: 'my-secret-password',
        range: '80',
        search: 'searching stuff',
        tel: 'k',
        text: 'Text!',
        time: '09:00',
        url: 'http://mungface.com',
        week: '2013-W03',
        select: 'bird'
      },
      key;

  function createInputTest(key) {
    return function () {
      var el = element(by.model(key)),
          val = el.getAttribute('value');
      expect(val).toEqual(inputTests[key]);
    };
  }

  for (key in inputTests) {
    if (inputTests.hasOwnProperty(key)) {
      it('will fill ' + key + ' inputs', createInputTest(key));
    }
  }

  it('will check checkboxes', function () {
    var mung = element(by.model('checkboxMung')),
        face = element(by.model('checkboxFace'));
    expect(mung.isSelected()).toBe(true);
    expect(face.isSelected()).toBe(false);
  });

  it('will check radios', function () {
    var el = element(by.id('radio-face'));
    expect(el.isSelected()).toBe(true);
  });

  it('will fill textareas', function () {
    var el = element(by.model('textarea')),
        val = el.getText();
    expect(val).toEqual('Mungface');
  });

});

