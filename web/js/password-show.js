define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * This widget allows user to show its password during form completing
     */
    $.widget('mage.passwordShow', {
        options: {
            actionType: 'onClick',
            mobileBreakPoint: 768
        },

        /**
         * @private
         */
        _create: function () {
            this.btnCheckPassword = $('.check-password');
            this.isShown = false;
            this._passwordShowHandler();
        },

        /**
         * Password show handler type
         */
        _passwordShowHandler: function (){
            var self = this;

            // On click
            if (this.options.actionType === 'onClick' || $(window).width() < this.options.mobileBreakPoint){
                self.btnCheckPassword.on('click', function(){
                    var el = $(this);

                    if (self.isShown) {
                        self._hidePasswordValue(el);
                    } else {
                        self._showPasswordValue(el);
                    }
                });
            }

            // On mouse release
            else if (this.options.actionType === 'onRelease'){
                self.btnCheckPassword
                    .on('mousedown', function(){
                        self._showPasswordValue($(this));
                    })
                    .on('mouseup', function(){
                        self._hidePasswordValue($(this));
                    });
            }
        },

        /**
         * Show input password value
         * @param {jQuery} el
         */
        _showPasswordValue: function(el){
            var passwordInput = el.siblings('input[type="password"]');
            passwordInput.attr('type', 'text');
            el.addClass('is-active');
            this.isShown = true;
        },

        /**
         * Hide input password value
         * @param {jQuery} el
         */
        _hidePasswordValue: function(el){
            var passwordInput = el.siblings('input[type="text"]');
            passwordInput.attr('type', 'password');
            el.removeClass('is-active');
            this.isShown = false;
        }
    });

    return $.mage.passwordShow;
});