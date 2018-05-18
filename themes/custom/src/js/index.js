require('bootstrap');
import '../styles/index.scss';

$(document).ready(function() {
  const headers = $('.content').find('h1, h2, h3');
  headers.each(addAnchorLink);

  console.log(
    '🙋I don’t have 🙅a sugar daddy 🍬🍭👨 I’ve never had a sugar daddy💰👨 If I wanted a sugar daddy 💵👨 yes I probably could go out and get one 🏃💨👠✨ because I am what? SICKENING 💅✨💁 You could never ❌have a sugar daddy because you are not that kind of girl🚫💰🙈 Baby 🍼👶everything I have I’ve worked for 💯✔️🙌 and gotten myself 👏 I have built🏢🏣 myself from the ground up 🔝✨👍 you fucking bitch 👊💥💫💀 *throws drink* 🍸💦✨'
  );
});

function addAnchorLink() {
  const id = $(this).attr('id');
  if (id != null) {
    const hrefEl = `<a href=#${id} class="anchor-link" aria-labek="Anchor" aria-hidden="true">#</a>`;
    $(this).append(hrefEl);
  }
}
