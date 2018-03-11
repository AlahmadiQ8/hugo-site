require('bootstrap');
import '../styles/index.scss';

$(document).ready(function() {
  const headers = $('.content').find('h1, h2, h3');
  headers.each(addAnchorLink);
});

function addAnchorLink() {
  const id = $(this).attr('id');
  if (id != null) {
    const hrefEl = `<a href=#${id} class="anchor-link" aria-labek="Anchor" aria-hidden="true">#</a>`;
    $(this).append(hrefEl);
  }
}
