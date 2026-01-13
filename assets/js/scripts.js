( function ( $ ) {
  const app = {
    initAnchor: function() {
      const scroll = function( scrollTop = 0, offset = 50 ) {
        $( 'html, body' ).stop().animate( { scrollTop: scrollTop - offset }, 1000 );
      };

      $( '[href^="#"]' ).click( function( e ) {
        e.preventDefault();
        const $this = $( this );
        const href = $this.attr('href');

        if ( '#top' == href ) {
          scroll();
        } else if ( $this.hasClass('scroll-down') ) {
          scroll( $( window ).height() + $(window).scrollTop() );
        } else if ( href.length > 2 ) {
          scroll( $( href ).offset().top );
        }
      } );

      $( '[href*="#"]:not([href^="#"])' ).click( function( e ) {
        const $this = $( this );
        const base = location.href.substring( 0, location.href.lastIndexOf( '/' ) ).toLowerCase();
        const href = $this.attr( 'href' );
        const hrefBase = href.substr( 0, href.indexOf( '#' ) );

        if ( base == hrefBase ) {
          e.preventDefault();
          const hash = href.substr( href.indexOf( '#' ) );
          
          scroll( $( hash ).offset().top );
        }
      });

      if ( location.hash ) {
        if( $( location.hash ).length > 0 ) {
          scroll( $( location.hash ).offset().top );
        }
      }
    },

    initHeaderScroll: function() {
      if ( $( window ).scrollTop() > 0 ) {
        if ( ! $( 'html' ).hasClass( 'is-scrolled' ) ) {
          $( 'html' ).addClass( 'is-scrolled' );
        }
      } else {
        if ( $( 'html' ).hasClass( 'is-scrolled' ) ) {
          $( 'html' ).removeClass( 'is-scrolled' );
        }  
      }
    },
    
    initMenu: function() {
      $( '.js-menu' ).on( 'click', function() {
        $( 'html' ).toggleClass( 'is-menu-opened' );
      } );
    },

    initMenuResize: function() {
      $( 'html' ).removeClass( 'is-menu-opened' );
    },
    
    initEmptyPage: function() {
      $( '.main, .lower__wrap' ).each( function() {
        if ( $( this ).html().trim() === '' ) {
          $( this ).empty();
        }
      } );
    },

    // Accordion
    initAccordion: function() {
      $( '.js-accordion' ).each( function() {
        let $root = $( this );

        $root.find( '.accordion__link' ).off( 'click' ).on( 'click', function( e ) {
          e.preventDefault();
          const $this = $( this );
          const $content = $this.next( '.accordion__content' );

          if ( $this.hasClass( 'is-active' ) ) {
            $this.removeClass( 'is-active' );
            $content.stop().slideUp();
          } else {

            console.log('sssss');
            $root.find( '.is-active' ).removeClass( 'is-active' ).next( '.accordion__content' ).stop().slideUp();

            $this.addClass( 'is-active' );
            $content.stop().slideDown();
          }
        } );

        $root.find( '.accordion__content' ).hide();
      } );
    },
    
    // Swiper
    initSwiper: function() {
      if ( $( '.js-swiper' ).length ) {
        $( '.js-swiper' ).each( function() {
          let options = null;

          if ( $( this ).hasClass( 'top-banner__texts' ) ) {
            options = {
              effect: 'fade',
              noSwipingClass: 'swiper-slide',
              speed: 1000,
              fadeEffect: {
                crossFade: true
              },
            };
          }  else if (
            $( this ).hasClass( 'top-sec03__swiper' ) ||
            $( this ).hasClass( 'employee-list__swiper' )
          ) {
            $root = $( this ).closest( 'section' );
            options = {
              centeredSlides: true,
              loop: true,
              slidesPerView: 'auto',
              spaceBetween: 20,
              // autoplay: {
              //   delay: 3000,
              //   disableOnInteraction: false,
              // },
              navigation: {
                nextEl: $root.find( '.swiper-nav__btn--next' )[0],
                prevEl: $root.find( '.swiper-nav__btn--prev' )[0],
              },
              on: {
                slideChange: function(s) {
                  $root.find( '.swiper-progress' ).css( '--width', (s.realIndex + 1) / s.slides.length * 100 + '%' );

                  if( $root.find( '.swiper-fraction' ).length ) {
                    $root.find( '.swiper-fraction__current' ).text( s.realIndex + 1 );
                  }
                }
              }
            };
          } 

          new Swiper( this, options );
        } );
      }
    },

    // Tabs
    initTabs: function() {
      if ( $( '.js-tabs' ).length ) {
        const updateTabs = function( id = '', $root = null ) {
          if ( null === $root ) {
            $root = $( '[href="' + id + '"]' ).closest( '.js-tabs' );
          }

          if ( null === id ) {
            id = $root.find( '.tabs__link' ).first().attr( 'href' );
          }

          const $nav = $root.find( '.tabs__nav' );
          const $content = $root.find( '.tabs__wrap' );

          console.log(id, $root);
          
          $nav.find( '.is-active' ).removeClass( 'is-active' );
          $content.find( '.is-active' ).removeClass( 'is-active' );
  
          $nav.find( '[href="' + id + '"]' ).parent().addClass( 'is-active' );
          $content.find( id ).addClass( 'is-active' );
        };

        $( '.js-tabs' ).each( function() {
          const $root = $( this );

          $root.find( '.tabs__link' ).off( 'click' ).on( 'click', function( e ) {
            e.preventDefault();
            const $this = $( this );

            if ( ! $this.hasClass( 'is-active' ) ) {
              const id = $this.attr( 'href' );

              updateTabs( id, $root );

              /* Uncomment to enable history logging */
              // history.pushState( { pageid: id }, '', id );
            }
          } );
        } );

      }
    },
  }

  /* Document Ready */
  $( document ).ready( function() {
    /* Uncomment to reset scroll position */
    // history.scrollRestoration = 'manual';

    app.initAnchor();

    app.initHeaderScroll();

    app.initMenu();
    app.initMenuResize();

    app.initEmptyPage();

    /* Uncommment as needed */
    app.initAccordion();
    app.initSwiper();
    app.initTabs();

  } );

  /* Window Load */
  $( window ).on( 'load', function() {
    
  } );

  /* Window Scroll */
  $( window ).on( 'scroll', function() {

    app.initHeaderScroll();

  } );
  
  /* Window Resize */
  $( window ).on( 'resize', function() {

    app.initMenuResize();

  } );

} )( jQuery );