"use strict";
var Core;
(function(Core) {
  var Slider = (function() {
    function Slider() {
      // Durations
      this.durations = {
        auto: 5000,
        slide: 1400
      };
      // DOM
      this.dom = {
        wrapper: null,
        container: null,
        project: null,
        current: null,
        next: null,
        arrow: null
      };
      // Misc stuff
      this.length = 0;
      this.current = 0;
      this.next = 0;
      this.isAuto = true;
      this.working = false;
      this.dom.wrapper = $('.page-view');
      this.dom.project = this.dom.wrapper.find('.project');
      this.dom.arrow = this.dom.wrapper.find('.arrow');
      this.length = this.dom.project.length;
      this.init();
      this.events();
      this.auto = setInterval(this.updateNext.bind(this), this.durations.auto);
    }
    /**
     * Set initial z-indexes & get current project
     */
    Slider.prototype.init = function() {
      this.dom.project.css('z-index', 10);
      this.dom.current = $(this.dom.project[this.current]);
      this.dom.next = $(this.dom.project[this.current + 1]);
      this.dom.current.css('z-index', 30);
      this.dom.next.css('z-index', 20);

      //fallback
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('body').addClass('outdated');
      }
      if (document.documentMode || /Edge/.test(navigator.userAgent)) {
        $('body').addClass('outdated');
      }
    };
    Slider.prototype.clear = function() {
      this.dom.arrow.off('click');
      if (this.isAuto)
        clearInterval(this.auto);
    };
    /**
     * Initialize events
     */
    Slider.prototype.events = function() {
      var self = this;
      this.dom.arrow.on('click', function() {
        if (self.working)
          return;
        self.processBtn($(this));
      });
    };
    Slider.prototype.processBtn = function(btn) {
      if (this.isAuto) {
        this.isAuto = false;
        clearInterval(this.auto);
      }
      if (btn.hasClass('next'))
        this.updateNext();
      };
    /**
     * Update next global index
     */
    Slider.prototype.updateNext = function() {
      this.next = (this.current + 1) % this.length;
      this.process();
    };
    /**
     * Update next global index
     */
    Slider.prototype.updatePrevious = function() {
      this.next--;
      if (this.next < 0)
        this.next = this.length - 1;
      this.process();
    };
    /**
     * Process, calculate and switch beetween slides
     */

    Slider.prototype.getQuote = function() {

      this.dom.next.innerHTML(data.quoteText);
      var quot = 'https://twitter.com/intent/tweet?text=' + data.quoteText + ' Author ' + data.quoteAuthor;
      if (data.quoteAuthor === '') {
        data.quoteAuthor = 'Unknown';
      }
      this.dom.next.innerHTML(data.quoteText);
      //$(".twitter-share-button").attr("href", quot);
    };


    Slider.prototype.process = function() {
      var self = this;
      var randomIndex = Math.floor(Math.random() * 8);
      var quotes = [{
        "quote":"Don't cry because it's over,</br> smile because it happened.",
        "author":"Dr. Seuss"
      },{
        "quote":"Be yourself;</br> everyone else is already taken.",
        "author":"Oscar Wilde"
      },{
        "quote":"You only live once,</br> but if you do it right,</br> once is enough.",
        "author":"Mae West"
      },{
        "quote":"Be the change that you wish to see in the world.",
        "author":"Mahatma Gandhi"
      },{
        "quote":"Insanity is doing the same thing, over and over again,</br> but expecting different results.",
        "author":"Narcotics Anonymous"
      },{
        "quote":"We accept the love we think we deserve.",
        "author":"Stephen Chbosky, The Perks of Being a Wallflower"
      },{
        "quote":"It is never too late to be what you might have been",
        "author":"George Eliot"
      },{
        "quote":"If you can't explain it to a six year old,</br> you don't understand it yourself.",
        "author":"Albert Einstein"
      },{
        "quote":"There is no greater agony than bearing an untold story inside you.",
        "author":"Maya Angelou, I Know Why the Caged Bird Sings"
      }];

      this.working = true;
      this.dom.next = $(this.dom.project[this.next]);
      this.dom.project[this.next].innerHTML ="<div class = 'text'><h1>&quot;" +  quotes[randomIndex].quote + "&quot;</h1><p> Author: "+quotes[randomIndex].author+"</p></div>";
      this.dom.arrow[1].children[0].href = "https://twitter.com/intent/tweet?text=" + quotes[randomIndex].quote + " Author:" + quotes[randomIndex].author;
      this.dom.current.css('z-index', 30);
      self.dom.next.css('z-index', 20);
      // Hide current
      this.dom.current.addClass('hide');
      setTimeout(function() {
        self.dom.current.css('z-index', 10);
        self.dom.next.css('z-index', 30);
        self.dom.current.removeClass('hide');
        self.dom.current = self.dom.next;
        self.current = self.next;
        self.working = false;
      }, this.durations.slide);
    };
    return Slider;
  }());
  Core.Slider = Slider;
})(Core || (Core = {}));
document.addEventListener('DOMContentLoaded', function() {
  new Core.Slider();
});
