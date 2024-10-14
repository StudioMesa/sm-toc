$(document).ready(function() {
  // 1. Generate the TOC
  var headings = $(".blog-item-content h2");
  var toc = $("<ul></ul>");

  headings.each(function(index) {
    var heading = $(this);
    var id = heading.text().trim().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
    if ($("#" + id).length) {
      id = id + '-' + index;
    }
    heading.attr('id', id);

    var tocItem = $("<li></li>");
    var tocLink = $("<a></a>");
    tocLink.attr('href', '#' + id);
    tocLink.text(heading.text());
    tocLink.attr('data-id', id);
    tocItem.append(tocLink);
    toc.append(tocItem);
  });

  // Insert the TOC into the page
  var tocContainer = $("#toc");
  if (tocContainer.length) {
    tocContainer.append(toc);
  }

  // 2. Move elements around
  // Move TOC under Share Wrapper
  $(".sm-blog-tools").append($("#toc"));

  // Move Share Wrapper under Blog Title
  $(".blog-item-title").append($(".sm-blog-tools"));

  // Move Post Date under Author Name
  $(".author-name").append($(".blog-item-author-date-wrapper"));

  // Move Author Profile to Share Container
  $(".share-container").prepend($(".blog-item-author-profile-wrapper"));

  // Move Author Image to Left (assuming correct selectors)
  $(".blog-item-author-profile-wrapper").append($(".author-avatar.content-fill"));

  // 3. Adjust the wrapper height after window load
  $(window).on('load', function() {
    adjustWrapperHeight();
  });

  function adjustWrapperHeight() {
    var wrapper = $(".blog-item-top-wrapper");

    if (wrapper.length) {
      // Calculate the total height of the wrapper's contents
      var totalHeight = 0;

      wrapper.children().each(function() {
        totalHeight += $(this).outerHeight(true);
      });

      // Set the wrapper's height
      wrapper.css('height', totalHeight + 'px');
    }
  }

  // 4. Optional: Highlight active TOC link on scroll (updated)
  $(window).on('scroll', function() {
    var scrollPosition = $(window).scrollTop() + $(window).height() / 2; // Middle of the viewport
    var currentId;
    headings.each(function() {
      var heading = $(this);
      var id = heading.attr('id');
      if (heading.offset().top <= scrollPosition) {
        currentId = id;
      }
    });
    if (currentId) {
      $('a[data-id]').removeClass('active');
      $('a[data-id="' + currentId + '"]').addClass('active');
    } else {
      $('a[data-id]').removeClass('active');
    }
  });
});
