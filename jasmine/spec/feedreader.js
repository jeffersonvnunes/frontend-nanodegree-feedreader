/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty.
         */
        it('all feeds have URL', function () {
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        /* Loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
        it('all feeds have a name not empty',function () {
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    describe('The menu', function () {

        /*
         * Verifies if the menu is hidden by default.
         */
        it('should be hidden by default',function () {
            var body = $('body');
            expect(body.attr('class').indexOf('menu-hidden') !== -1).toBe(true);
        });

         /*
          * Verifies if the menu is shown if clicked and it is hidden if clicked again
          */
        it('click show/hide feed list', function () {
            var menuIcon = $('.menu-icon-link'),
                body = $('body');

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {

        /*
         * Verifies if when loadFeed is called and and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('loadFeed success there is at least a single .entry element', function () {
            var entries = $('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);
        });
    });


    describe('New Feed Selection', function () {

        /*
        * Verifies if when loadFeed is called with a new feed and and completes its work, the content actually changes.
        */
        var titleInicial,
            feedInitial;

        beforeEach(function (done) {
            loadFeed(0, function () {
                titleInicial = $('.header-title').html();
                feedInitial = $('.feed').html();

                loadFeed(1, function () {
                    done();
                });
            });
        });

        it('load new content on feed ', function () {
            var titleChamged = $('.header-title').html(),
                feedChanged = $('.feed').html();
            expect(titleChamged).not.toBe(titleInicial);
            expect(feedChanged).not.toBe(feedInitial);
        });
    });
}());
