define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * This widget transform list elements to select elements
     */
    $.widget('mage.listToSelect', {
        options: {
            mobileOnly: false,
            mobileBreakPoint: 768
        },

        /**
         * @private
         */
        _create: function () {

            if( this.options.mobileOnly ){
                if ($(window).width() < this.options.mobileBreakPoint) {
                    this._updateDOM();
                }
            } else {
                this._updateDOM();
            }
        },

        /**
         * Reorganize DOM to add select
         */
        _updateDOM: function(){
            this.element.wrapAll('<div class="list-to-select__wrapper" />');

            // Hide native list element
            this.element.hide();

            // Create select element
            $('.list-to-select__wrapper').append('<select />');

            // Add options to select
            this._addAllOptions();
        },

        /**
         * Populate select with list elements
         */
        _addAllOptions: function(){
            this.element.find('li').each(function() {
                var el = $(this);
                $("<option />", {
                    "value"   : el.attr("href"),
                    "text"    : el.text()
                }).appendTo(".list-to-select__wrapper select");
            });

            // Select default option
            $(".list-to-select__wrapper").first('option').attr('selected', 'selected');
        }
    });

    return $.mage.listToSelect;
});