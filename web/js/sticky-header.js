define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * This widget allows to add animated scroll to target element on link click
     */
    $.widget('mage.stickyHeader', {

        /**
         * @private
         */
        _create: function () {
            this.body = $('body');
            this.header = $('.page-header');
            this.isSticky = false;

            this._updateHeader();
            this._scrollHandler();
            this._resizeHandler();
        },

        /**
         * Update header values
         */
        _updateHeader: function(){
            this.headerHeight = this.header.innerHeight();
            this.headerPos = this.header.offset().top;

            if(this.isSticky){
                this.body.css('padding-top', this.headerHeight);
            }
        },

        /**
         * Scroll handler
         */
        _scrollHandler: function(){
            $(window).on('scroll', function() {
                this.toggleClassHandler();
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
        toggleClassHandler: function() {
            if ( $(window).scrollTop() >= this.headerPos ) {
                this.body.css('padding-top', this.headerHeight);
                this.header.addClass('sticky');
                this.isSticky = true;
            } else {
                this.body.css('padding-top', 0);
                this.header.removeClass('sticky');
                this.isSticky = false;
            }
        }
    });

    return $.mage.stickyHeader;
});