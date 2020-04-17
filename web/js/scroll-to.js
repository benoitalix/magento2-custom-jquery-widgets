define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * This widget allows to add animated scroll to target element on link click
     */
    $.widget('mage.scrollTo', {
        options: {
            linksElement: '[data-role=links]',
            animateDuration: 500,
            stickyHeader: false
        },

        /**
         * @private
         */
        _create: function () {
            this._linksHandler();
        },

        /**
         * Links handler
         */
        _linksHandler: function () {
            var self = this;

            $(this.options.linksElement).find('a').on('click', function(event){
                if (this.hash !== "") {
                    event.preventDefault();

                    self.hash = this.hash;
                    var selectedLink = $(this).attr('href');

                    self._linksToggleClass($(this));
                    self._scrollToTarget(selectedLink);
                }
            });
        },

        /**
         * Toggle links current class
         * @param {jQuery} el
         */
        _linksToggleClass: function(el) {
            var navigationItems = $(this.options.linksElement).find('ul li');

            navigationItems.removeClass('current');
            el.parent().addClass('current');
        },

        /**
         * Animate window scroll to target
         * @param {jQuery} target
         */
        _scrollToTarget: function(target){
            var self = this;
            var headerHeight = $('.page-header').innerHeight() + 20;
            var targetPosition = self.options.stickyHeader ? $(target).offset().top - headerHeight: $(target).offset().top;

            $('html, body').animate({
                scrollTop: targetPosition
            }, self.options.animateDuration, function(){
                self._updateHashUrl(targetPosition);
            });
        },

        /**
         * Update browser hash
         * @param {number} targetPosition
         */
        _updateHashUrl: function(targetPosition){
            window.location.hash = this.hash;
            $('html, body').scrollTop(targetPosition);
        }
    });

    return $.mage.scrollTo;
});