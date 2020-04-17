define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * This widget allows user to check if its password is strong enough
     */
    $.widget('mage.passwordStrength', {

        /**
         * @private
         */
        _create: function () {
            this.passwordInput = $('input#password');
            this._passwordHandler();
        },

        /**
         * Check if input password contains 1 constraint
         * @param {string} regex
         * @param {string} password
         * @param {jQuery} item
         */
        _checkConstraint: function(regValue, password, item){
            var test = regValue.test(password);

            if(test) {
                item.removeClass('is-false').addClass('is-true');
            } else {
                item.addClass('is-false');
            }
        },

        /**
         * Check rules
         */
        _checkReg: function(){
            var self = this;
            var constraintUppercase = $('.constraint-uppercase');
            var constraintLowercase = $('.constraint-lowercase');
            var constraintNumber = $('.constraint-number');

            // Check 1 uppercase
            self._checkConstraint(/[A-Z]+/, self.passwordInput.val(), constraintUppercase);

            // Check 1 lowercase
            self._checkConstraint(/[a-z]+/, self.passwordInput.val(), constraintLowercase);

            // Check 1 digit
            self._checkConstraint(/\d+/, self.passwordInput.val(), constraintNumber);
        },

        /**
         * Check password length
         */
        _checkLength: function(){
            var self = this;
            var constraintCharacterNumber = $('.constraint-character-number');

            if(self.passwordInput.val().length < 8) {
                constraintCharacterNumber.addClass('is-false');
            } else {
                constraintCharacterNumber.removeClass('is-false').addClass('is-true');
            }
        },

        /**
         * Password input handler
         */
        _passwordHandler: function(){
            var self = this;

            self.passwordInput.on('keyup', function(){
                self._checkReg();
                self._checkLength();
            });
        }
    });

    return $.mage.passwordStrength;
});