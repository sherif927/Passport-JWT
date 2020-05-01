const redis = require('redis');
const { v4 } = require('uuid');
const path = require('path');
const { readFile } = require('fs');
const { setAsync } = require('../utils/redis');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

/**
 * class responsible for the 
 * mail notifications
 *
 * @class MailHandler
 */
class MailHandler {

  /**
   *
   * @param {*} url
   * @returns a callback url with a random ID
   * @memberof MailHandler
   */
  async createConfirmEmailLink(url, userId) {
    const id = v4();
    await setAsync(id, 300, userId.toString()).catch(e => console.error(e));
    return `${url}/confirm/${id}`;
  }


  /**
   *
   * @static
   * @param {string} url
   * @param {string} email
   * @param {string} name
   * @returns {Promise}
   * @memberof MailHandler
   */
  sendConfirmationEmail(url, email, name) {
    readFile(path.join(__dirname, '../html-templates/confirm.html'), async (err, fileData) => {
      console.log(url);
      if (err) throw err;
      const htmlString = fileData.toString();
      const finalHtmlString = htmlString
        .replace('###name###', name)
        .replace('###callbackurl###', url);


      const msg = {
        to: email,
        from: 'sherif.amr.927@gmail.com',
        subject: 'Confirm Registration Email',
        html: finalHtmlString,
      };
      let response = await sgMail.send(msg).catch(e => console.log(e));
      if (response.statusCode == 202) console.log('Email Sent Successfully');
    })


  }
}

module.exports = new MailHandler();