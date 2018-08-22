import animate from './animateplus';
import { enhance } from './utils';

export default enhance('payment-state-changes', () => {
  const speed = 500;

  // 1.0 CREATED CARD
  animate({
    elements: '.card_one--js',
    delay: 300,
    duration: speed,
    transform: ['scale(0.9)', 'scale(1)'],
    opacity: [0, 1],
  })
    .then(() =>
      animate({
        elements: '.card_circle--js',
        duration: speed,
        transform: ['scale(0.9)', 'scale(1)'],
        opacity: [0, 1],
      }),
    )

    // 2.1 AUTHORIZED LINE & CARD
    .then(() =>
      Promise.all([
        animate({
          elements: '.line_auth-1',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['288.468', '0'],
        }),
        animate({
          elements: '.card_two--js',
          duration: speed,
          transform: ['scale(0.9)', 'scale(1)'],
          opacity: [0, 1],
        }),
      ]),
    )

    // 2.2 AUTHORIZED LINE ACTIVE
    .then(() =>
      animate({
        elements: '.line_auth-2',
        duration: speed,
        easing: 'out-cubic',
        'stroke-dashoffset': ['288.468', '0'],
      }),
    )
    .then(() =>
      animate({
        elements: '.line_auth-2',
        duration: speed,
        easing: 'out-cubic',
        'stroke-dashoffset': ['0', '-288.468'],
      }),
    )

    // 2.3 AUTHORIZED CARD CHECK
    .then(() =>
      Promise.all([
        animate({
          elements: '.card_two--js',
          duration: 0,
          easing: 'in-out-cubic',
          'border-color': ['#EEEEEE', '#4CD964'],
          'border-width': ['1px', '2px'],
          margin: ['0px', '-1px'],
        }),
        animate({
          elements: '.card_circle_check--js',
          duration: speed,
          transform: ['scale(0.8)', 'scale(1)'],
          opacity: [0, 1],
        }),
      ]),
    )

    // 2.4 EXPIRED & SHIPPED LINE/CARD
    .then(() =>
      Promise.all([
        animate({
          elements: '.line_expired-1',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['240.685', '0'],
        }),
        animate({
          elements: '.line_shipped-1',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['224.49', '0'],
        }),
        animate({
          elements: '.card_three--js',
          duration: speed,
          transform: ['scale(0.9)', 'scale(1)'],
          opacity: [0, 1],
        }),
        animate({
          elements: '.card_four--js',
          duration: speed,
          transform: ['scale(0.9)', 'scale(1)'],
          opacity: [0, 1],
        }),
      ]),
    )

    // 2.5 EXPIRED & SHIPPED LINE ACTIVE
    .then(() =>
      Promise.all([
        animate({
          elements: '.line_expired-2',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['240.685', '0'],
        }),
        animate({
          elements: '.line_shipped-2',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['224.49', '0'],
        }),
      ]),
    )
    .then(() =>
      Promise.all([
        animate({
          elements: '.line_expired-2',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['0', '-240.685'],
        }),
        animate({
          elements: '.line_shipped-2',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['0', '-224.49'],
        }),
      ]),
    )

    // 3.0 PAID & CANCELED LINE/CARD
    .then(() =>
      Promise.all([
        animate({
          elements: '.line_paid-1',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['279.21', '0'],
        }),
        animate({
          elements: '.card_five--js',
          duration: speed,
          transform: ['scale(0.9)', 'scale(1)'],
          opacity: [0, 1],
        }),
        animate({
          elements: '.line_canceled-1',
          duration: 1000,
          easing: 'out-cubic',
          'stroke-dashoffset': ['711.921', '0'],
        }),
        animate({
          elements: '.card_seven--js',
          duration: speed,
          transform: ['scale(0.9)', 'scale(1)'],
          opacity: [0, 1],
        }),
      ]),
    )

    // 3.1 PAID & CANCELED LINE ACTIVE
    .then(() =>
      Promise.all([
        animate({
          elements: '.line_paid-2',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['279.21', '0'],
        }),
        animate({
          elements: '.line_canceled-2',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['711.921', '0'],
        }),
      ]),
    )
    .then(() =>
      Promise.all([
        animate({
          elements: '.line_paid-2',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['0', '-279.21'],
        }),
        animate({
          elements: '.line_canceled-2',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['0', '-711.921'],
        }),
      ]),
    )

    // 3.2 PAID CARD CHECK
    .then(() =>
      Promise.all([
        animate({
          elements: '.card_five--js',
          duration: 0,
          easing: 'in-out-cubic',
          'border-color': ['#EEEEEE', '#4CD964'],
          'border-width': ['1px', '2px'],
          margin: ['0px', '-1px'],
        }),
        animate({
          elements: '.card_circle_check-2--js',
          duration: speed,
          transform: ['scale(0.8)', 'scale(1)'],
          opacity: [0, 1],
        }),
      ]),
    )

    // 4.0 PAID SHIPPED & REFUND CARD/LINE
    .then(() =>
      Promise.all([
        animate({
          elements: '.line_shipped_paid-1',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['314.045', '0'],
        }),
        animate({
          elements: '.line_refund-1',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['243.517', '0'],
        }),
        animate({
          elements: '.card_six--js',
          duration: speed,
          transform: ['scale(0.9)', 'scale(1)'],
          opacity: [0, 1],
        }),
      ]),
    )

    // 4.1 SHIPPED & REFUND LINE ACTIVE
    .then(() =>
      Promise.all([
        animate({
          elements: '.line_shipped_paid-2',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['314.045', '0'],
        }),
        animate({
          elements: '.line_refund-2',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['243.517', '0'],
        }),
      ]),
    )
    .then(() =>
      Promise.all([
        animate({
          elements: '.line_shipped_paid-2',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['0', '-314.045'],
        }),
        animate({
          elements: '.line_refund-2',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['0', '-243.517'],
        }),
      ]),
    )

    // 4.2 SHIPPED REFUND LINE
    .then(() =>
      Promise.all([
        animate({
          elements: '.card_circle-2--js',
          duration: speed,
          transform: ['scale(0.9)', 'scale(1)'],
          opacity: [0, 1],
        }),
        animate({
          elements: '.line_shipped_refund-1',
          duration: speed,
          easing: 'out-cubic',
          'stroke-dashoffset': ['178.822', '0'],
        }),
      ]),
    )

    // 4.3 SHIPPED REFUND LINE ACTIVE
    .then(() =>
      animate({
        elements: '.line_shipped_refund-2',
        duration: speed,
        easing: 'out-cubic',
        'stroke-dashoffset': ['178.822', '0'],
      }),
    )
    .then(() =>
      animate({
        elements: '.line_shipped_refund-2',
        duration: speed,
        easing: 'out-cubic',
        'stroke-dashoffset': ['0', '-178.822'],
      }),
    );
});
