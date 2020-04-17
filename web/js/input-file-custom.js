define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * This widget allows to custom input file element
     */
    $.widget('mage.inputFileCustom', {
        options: {
            input: $('[data-role=input-file]'),
            button: $('[data-role=input-file-trigger]'),
            message: $('[data-role=input-file-message]')
        },

        /**
         * @private
         */
        _create: function () {
            this._inputHandler();
            this._buttonHandler();
        },

        /**
         * Input file handler
         */
        _inputHandler: function() {
            var self = this;

            self.options.input.on('change', function(event) {
                var fileName = self._getFileName($(this));

                self.options.message
                    .text(fileName)
                    .addClass('success');
            });
        },

        /**
         * Input file button handler
         */
        _buttonHandler: function() {
            var self = this;

            // Click event
            self.options.button.on('click', function(event) {
                event.preventDefault();
                self.options.input.trigger('click');
            });

            // Key support for accessibility
            self.options.button.on('keydown', function(event) {
                if ( event.keyCode === 13 || event.keyCode === 32 ) {
                    self.fileInput.trigger('click');
                }
            });
        },

        /**
         * Return file name
         * @param {jQuery} input
         */
        _getFileName: function(input) {
            var inputValue = input.val();
            var file = inputValue.split("\\");
            var fileName = file[file.length-1];

            return fileName;
        }
    });

    return $.mage.inputFileCustom;
});