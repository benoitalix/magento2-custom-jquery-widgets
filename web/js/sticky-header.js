define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * This widget allows to add sticky header
     */
    $.widget('mage.stickyHeader', {
        windowEl: $(window),
        bodyEl: $('body'),
        header: $('.page-header'),
        headerPosition: $('.page-header').offset().top,
        headerHeight: 0,
        hasStickyWrapper: false,

        /**
         * @private
         */
        _create: function () {
            this._updateHeader();
            this._scrollHandler();
            this._resizeHandler();
        },

        /**
         * Update header values
         */
        _updateHeader: function(){
            // Calculate new height
            this.headerHeight = this.header.innerHeight();

            if(this.hasStickyWrapper){
                // Update sticky wrapper container height
                $('.sticky-wrapper').height(this.headerHeight);
            } else {
                // Add sticky wrapper
                this.header.wrap('<div class="sticky-wrapper"></div>');
                $('.sticky-wrapper').height(this.headerHeight);
            }
        },

        /**
         * Scroll handler
         */
        _scrollHandler: function(){
            $(window).on('scroll', function() {
                this._toggleClassHandler();
            }.bind(this));
        },

        /**
         * Resize handler
         */
        _resizeHandler: function(){
            var self = this;
            var resizeId;

            $(window).on('resize', function() {
                clearTimeout(resizeId);
                resizeId = setTimeout(function(){
                    self._updateHeader();
                }, 500);
            });
        },

        /**
         * Toggle class handler
         */
        _toggleClassHandler: function() {
            if ( this.windowEl.scrollTop() >= this.headerPosition ) {
                this.bodyEl.addClass('sticky');
            } else {
                this.bodyEl.removeClass('sticky');
            }
        }
    });

    return $.mage.stickyHeader;
});