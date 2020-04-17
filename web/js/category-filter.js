define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * This widget allows to filter listing of article or pushs by categories
     */
    $.widget('mage.categoryFilter', {
        options: {
            filter: $('[data-role=filter]'),
            filters: $('[data-role=filters]'),
            allCategories: $('[data-role=category]'),
            animateDuration: 200,
            defaultCategory: "all",
            mobileSelect: false,
            mobileBreakPoint: 768
        },

        /**
         * @private
         */
        _create: function () {

            // Mobile
            if (this.options.mobileSelect && $(window).width() < this.options.mobileBreakPoint) {
                this._convertListToSelect();
                this._filterSelectHandler();
            }

            // Desktop
            else {
                this._filterButtonHandler();
            }

            // Load default category
            this._activeDefaultCategory();
        },

        /**
         * Set default category
         */
        _activeDefaultCategory: function () {
            var self = this;
            var defaultItem = $('[data-filter=' + this.options.defaultCategory + ']');

            // Active link
            if (this.options.mobileSelect && $(window).width() < this.options.mobileBreakPoint) {
                $(".category-filters option[value=" + this.options.defaultCategory + "]").attr('selected', 'selected'); // Mobile
            } else {
                defaultItem.addClass('is-active'); // Desktop
            }

            self.filterCategory(defaultItem.data('filter'));
        },

        /**
         * Listen to filter button click event
         */
        _filterButtonHandler: function () {
            var self = this;

            self.options.filter.on('click', function () {
                var category = $(this).data('filter');
                self.options.filter.removeClass('is-active');
                $(this).addClass('is-active');
                self.filterCategory(category);
            });
        },

        /**
         * Listen to filter select change (on mobile)
         */
        filterSelectHandler: function () {
            var self = this;

            $(document).on('change', '.category-filters select', function () {
                var category = $(this).val();
                self.filterCategory(category);
            });
        },

        /**
         * Transform list elements to select elements (for mobile resolution)
         */
        _convertListToSelect: function () {
            var self = this;

            self.options.filters.wrapAll('<div class="category-filters" />');

            // Hide native list element
            self.options.filters.hide();

            // Create select element
            $('.category-filters').append('<select />');

            // Add options to select
            for (var i = 0; i < self.options.filter.length; i++) {
                var el = $(self.options.filter[i]);

                $("<option />", {
                    "value": el.data("filter"),
                    "text": el.text()
                }).appendTo(".category-filters select");
            }
        },

        /**
         * Filter categories after click
         * @param {string} requiredCategory
         */
        _filterCategory: function (requiredCategory) {
            var self = this;

            if (requiredCategory == 'all') {
                // Show
                self._lazyLoadImages(requiredCategory);
                self.options.allCategories.fadeIn(self.options.animateDuration);
            } else {
                // Hide
                self.options.allCategories.fadeOut(self.options.animateDuration);
                setTimeout(function () {
                    // Show
                    self._lazyLoadImages(requiredCategory);
                    $('[data-category*=' + requiredCategory + ']').fadeIn(self.options.animateDuration);
                }, self.options.animateDuration);
            }
        },

        /**
         * Lazy load on categories images
         * @param {string} category
         */
        _lazyLoadImages: function (category) {
            var self = this;
            var categoryImages = category == "all" ? self.options.allCategories.find('img[data-lazy]') : $('[data-category*=' + category + ']').find('img[data-lazy]');

            for (var i = 0; i < categoryImages.length; i++) {
                var image = $(categoryImages[i]);

                if (image.attr('src') == "") {
                    var imageSrc = image.data('lazy');
                    image.attr('src', imageSrc);
                }
            }
        }
    });

    return $.mage.categoryFilter;
});