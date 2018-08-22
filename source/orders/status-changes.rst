Order status changes
====================

Orders and order lines can go through a number of different statuses. First we will discuss the difference between
two possible flows for orders. After that we will list all the possible statuses for both **orders** and **order lines**.

Two flows: authorized and paid
------------------------------
There are basically two different flows for an order, depending on the payment method that is used to pay the order.

Authorized
^^^^^^^^^^
Some payment methods support *authorizations*. This means that a consumer can authorize a payment, but it will not be
executed immediately. It will give us all the needed information to process the payment at a later point. This execution
is called a *capture*.

If the payment method supports authorizations, the consumer will authorize a payment when the order is created. If the
authorization is successful, the order will have status ``authorized``.

Each time a shipment is created, we will automatically execute a capture too. The shipment can be for the complete order
or for only part of the order. Only the amount that is shipped will be captured.

Paid
^^^^
If a payment method does not support authorizations, the payment will be paid immediately when the order is created. You
can create shipments for these orders just like in the *authorized* flow, but it won't have any effect on the payment.

Possible statuses for orders
----------------------------
The following diagram shows how one order status leads to another:

.. image:: images/order-status-flow@2x.png

.. _order-status-created:

``created``
^^^^^^^^^^^
    The order has been created, but nothing else has happened yet.

    * This is not a status Mollie will call your webhook for.
    * All order lines will also be in the ``created`` state.
    * Can transition to: ``paid``, ``authorized`` and ``canceled``.

.. _order-status-paid:

``paid``
^^^^^^^^
    The order status will be set to this status when the order's payment is successfully completed with a payment method
    that does not support authorizations.

    * Mollie will call your webhook when the order reaches this state.
    * Order lines can be in the state ``paid`` or ``refunded``. Not all lines are ``refunded``.
    * Can transition to: ``shipping`` and ``refunded``.

.. _order-status-authorized:

``authorized``
^^^^^^^^^^^^^^
    If the order's payment is successfully completed with a payment method that does support authorizations, the order
    is set to this status. The money will only be transferred once a shipment is created for the order. Currently only
    Klarna Pay Later uses this status.

    * Mollie will call your webhook when the order reaches this state.
    * Order lines can be in the state ``authorized`` or ``canceled``. Not all lines are ``canceled``.
    * Can transition to: ``shipping``, ``canceled`` and ``expired``.

.. _order-status-shipping:

``shipping``
^^^^^^^^^^^^
    The order will move into this state when you start shipping your first order lines. When the order is in this state,
    it means that you still have some order lines that are not shipped yet.

    * This is not a status Mollie will call your webhook for.
    * Order lines can be in the states ``paid``, ``authorized``, ``shipping``, ``completed``, ``refunded`` or
      ``canceled``. At least one line should be in ``paid`` or ``authorized`` and at least one other line should be
      ``completed``.
    * Can transition to: ``completed``.

.. _order-status-completed:

``completed``
^^^^^^^^^^^^^
    When all order lines are shipped or canceled, the order will be set to this status. At least one line should be
    shipped. If all lines are canceled, the status of the order will change to ``canceled`` instead.

    * Mollie will call your webhook when the order reaches this state.
    * Order lines can be in the states ``completed``, ``canceled`` or ``refunded``. At least one line should be
      ``completed``.
    * This is a final state, the order can't transition to another state.

.. _order-status-canceled:

``canceled``
^^^^^^^^^^^^
    When all order lines are canceled, the order is also set to canceled. Orders can only be canceled by the merchant,
    not by the consumer.

    * Mollie will call your webhook when the order reaches this state.
    * All order lines will also be in the ``canceled`` state.
    * This is a final state, the order can't transition to another state.

.. _order-status-refunded:

``refunded``
^^^^^^^^^^^^
    When an order was paid with a payment method that transfers the money immediately, but the order was completely
    canceled, the order will be set to this status.

    .. note:: This status is *not* used when you refund orders or order lines after you have shipped them. In that case
              the status will stay at ``completed``.

    * Mollie will call your webhook when the order reaches this state.
    * All order lines will also be in the ``refunded`` state.
    * This is a final state, the order can't transition to another state.

.. _order-status-expired:

``expired``
^^^^^^^^^^^
    The order will expire when an order is not shipped in time after an authorization. This is currently 28 days but
    might change in the future.

    * Mollie will call your webhook when the order reaches this state.
    * All order lines will be ``canceled``.
    * This is a final state, the order can't transition to another state.

Possible statuses for order lines
---------------------------------
The following diagram shows how one order line status leads to another:


.. raw:: html

     <div class="state-changes" data-enhancer="payment-state-changes">
      <div class="card card_one--js">
        <h1>Product</h1>
        <div class="card_label card_label--grey"><p>created</p></div>
        <div class="card_circle card_circle--js"></div>
      </div>

      <!--AUTHORIZED CARD & LINE-->
      <svg class="line_auth" width="206px" height="88px" viewBox="0 0 206 88">
        <path class="line_auth-1" transform="translate(-125.000000, -117.000000)" fill="none" stroke="#CCCCCC" stroke-width="2" d="M126.5,204 L223,204 C225.761424,204 228,201.761424 228,199 L228,123.025391 C228,120.263967 230.238576,118.025391 233,118.025391 L329.851681,118.025391"></path>
        <path class="line_auth-2" transform="translate(-125.000000, -117.000000)" fill="none" stroke="currentColor" stroke-width="2" d="M126.5,204 L223,204 C225.761424,204 228,201.761424 228,199 L228,123.025391 C228,120.263967 230.238576,118.025391 233,118.025391 L329.851681,118.025391"></path>
      </svg>
      <div class="card card_two--js">
        <h1>Product</h1>
        <div class="card_label card_label--green"><p>authorised</p></div>
        <div class="card_circle card_circle_check--js">
          <svg class="card_circle_check--tick" width="6px" height="6px" viewBox="0 0 6 6">
            <polygon transform="translate(-436.000000, -115.000000)" fill="#FFFFFF" fill-rule="nonzero" points="437.977552 119.203895 440.962421 115.646667 441.673867 116.243641 438.092024 120.512315 435.957687 118.721393 436.554661 118.009948"></polygon>
        </svg>
        </div>
      </div>

      <!--EXPIRED CARD & LINE-->
      <svg class="line_expired" width="203px" height="46px" viewBox="0 0 203 46">
        <path class="line_expired-1" transform="translate(-447.000000, -73.000000)" fill="none" stroke="#CCCCCC" stroke-width="2" d="M448,118 L543,118 C545.761424,118 548,115.761424 548,113 L548,79.0253906 C548,76.2639669 550.238576,74.0253906 553,74.0253906 L649,74.0253906"></path>
        <path class="line_expired-2" transform="translate(-447.000000, -73.000000)" fill="none" stroke="currentColor" stroke-width="2" d="M448,118 L543,118 C545.761424,118 548,115.761424 548,113 L548,79.0253906 C548,76.2639669 550.238576,74.0253906 553,74.0253906 L649,74.0253906"></path>
      </svg>
      <div class="card card_three--js">
        <h1>Product</h1>
        <div class="card_label card_label--grey"><p>expired</p></div>
      </div>

      <!--SHIPPED LINE & CARD-->
      <svg class="line_shipped" width="204px" height="29px" viewBox="0 0 204 29">
        <path class="line_shipped-1" transform="translate(-447.000000, -117.000000)" fill="none" stroke="#CCCCCC" stroke-width="2" d="M448,118 L543,118 C545.761424,118 548,120.238576 548,123 L548,139.974609 C548,142.736033 550.238576,144.974609 553,144.974609 L649.804688,144.974609"></path>
        <path class="line_shipped-2" transform="translate(-447.000000, -117.000000)" fill="none" stroke="currentColor" stroke-width="2" d="M448,118 L543,118 C545.761424,118 548,120.238576 548,123 L548,139.974609 C548,142.736033 550.238576,144.974609 553,144.974609 L649.804688,144.974609"></path>
      </svg>
      <svg class="line_shipped--paid" width="205px" height="118px" viewBox="0 0 205 118">
        <path class="line_shipped_paid-1" transform="translate(-443.000000, -171.000000)" fill="none" stroke="#CCCCCC" stroke-width="2" d="M444.628906,287.965699 L543,287.965699 C545.761424,287.965699 548,285.727122 548,282.965699 L548,177.024212 C548,174.262788 550.238576,172.024212 553,172.024212 L647.02174,172.024212"></path>
        <path class="line_shipped_paid-2" transform="translate(-443.000000, -171.000000)" fill="none" stroke="currentColor" stroke-width="2" d="M444.628906,287.965699 L543,287.965699 C545.761424,287.965699 548,285.727122 548,282.965699 L548,177.024212 C548,174.262788 550.238576,172.024212 553,172.024212 L647.02174,172.024212"></path>
      </svg>
      <svg class="line_shipped--refund" width="58px" height="88px" viewBox="0 0 58 88">
        <path class="line_shipped_refund-1" transform="translate(-746.000000, -158.000000)" fill="none" stroke="#CCCCCC" stroke-width="2" d="M747,159 L798,159 C800.761424,159 803,161.238576 803,164 L803,239.96582 C803,242.727244 800.761424,244.96582 798,244.96582 L761.854492,244.96582"></path>
        <path class="line_shipped_refund-2" transform="translate(-746.000000, -158.000000)" fill="none" stroke="currentColor" stroke-width="2" d="M747,159 L798,159 C800.761424,159 803,161.238576 803,164 L803,239.96582 C803,242.727244 800.761424,244.96582 798,244.96582 L761.854492,244.96582"></path>
      </svg>

      <div class="card card_four--js">
        <h1>Product</h1>
        <div class="card_label card_label--yellow"><p>shipped</p></div>
        <div class="card_circle card_circle-2--js"></div>
      </div>

      <!--PAID LINE & CARD-->
      <svg class="line_paid" width="206px" height="84px" viewBox="0 0 206 84">
        <path class="line_paid-1" transform="translate(-125.000000, -205.000000)" fill="none" stroke="#CCCCCC" stroke-width="2" d="M127.5,206 L223,206 C225.761424,206 228,208.238576 228,211 L228,283 C228,285.761424 230.238576,288 233,288 L329,288"></path>
        <path class="line_paid-2" transform="translate(-125.000000, -205.000000)" fill="none" stroke="currentColor" stroke-width="2" d="M127.5,206 L223,206 C225.761424,206 228,208.238576 228,211 L228,283 C228,285.761424 230.238576,288 233,288 L329,288"></path>
      </svg>
      <div class="card card_five--js">
        <h1>Product</h1>
        <div class="card_label card_label--green"><p>paid</p></div>
        <div class="card_circle card_circle_check-2--js">
          <svg class="card_circle_check--tick" width="6px" height="6px" viewBox="0 0 6 6">
            <polygon class="tick" transform="translate(-436.000000, -115.000000)" fill="#FFFFFF" fill-rule="nonzero" points="437.977552 119.203895 440.962421 115.646667 441.673867 116.243641 438.092024 120.512315 435.957687 118.721393 436.554661 118.009948"></polygon>
          </svg>
        </div>
      </div>

      <!--REFUND LINE & CARD-->
      <svg class="line_refund" width="207px" height="46px" viewBox="0 0 207 46">
        <path class="line_refund-1" transform="translate(-443.000000, -243.000000)" fill="none" stroke="#CCCCCC" stroke-width="2" d="M444.5,288 L543,288 C545.761424,288 548,285.761424 548,283 L548,249 C548,246.238576 550.238576,244 553,244 L648.5,244"></path>
        <path class="line_refund-2" transform="translate(-443.000000, -243.000000)" fill="none" stroke="currentColor" stroke-width="2" d="M444.5,288 L543,288 C545.761424,288 548,285.761424 548,283 L548,249 C548,246.238576 550.238576,244 553,244 L648.5,244"></path>
      </svg>
      <div class="card card_six--js">
        <h1>Product</h1>
        <div class="card_label card_label--blue"><p>refund</p></div>
      </div>

      <!--CANCELED LINE & CARD-->
      <svg class="line_canceled" width="523px" height="164px" viewBox="0 0 523 164">
        <path class="line_canceled-1" transform="translate(-126.000000, -205.000000)" fill="none" stroke="#CCCCCC" stroke-width="2" d="M127,206 L223.087891,206 C225.849314,206 228.087891,208.238576 228.087891,211 L228.087891,363 C228.087891,365.761424 230.326467,368 233.087891,368 L543,368 C545.761424,368 548,365.761424 548,363 L548,335 C548,332.238576 550.238576,330 553,330 L647.5,330"></path>
        <path class="line_canceled-2" transform="translate(-126.000000, -205.000000)" fill="none" stroke="currentColor" stroke-width="2" d="M127,206 L223.087891,206 C225.849314,206 228.087891,208.238576 228.087891,211 L228.087891,363 C228.087891,365.761424 230.326467,368 233.087891,368 L543,368 C545.761424,368 548,365.761424 548,363 L548,335 C548,332.238576 550.238576,330 553,330 L647.5,330"></path>
      </svg>
      <div class="card card_seven--js">
        <h1>Product</h1>
        <div class="card_label card_label--grey"><p>canceled</p></div>
      </div>
    </div>

.. _orderline-status-created:

``created``
^^^^^^^^^^^
    The order line has been created, but nothing else has happened yet.

    * The order will also be in the ``created`` state.
    * Can transition to: ``paid``, ``authorized`` and ``canceled``.

.. _orderline-status-paid:

``paid``
^^^^^^^^
    The order line status will be set to this status when the order's payment is successfully completed with a payment
    method that does not support authorizations.

    * The order has status ``paid`` or ``shipping``.
    * Can transition to: ``shipping`` or ``refunded``.

.. _orderline-status-authorized:

``authorized``
^^^^^^^^^^^^^^
    If the order's payment is successfully completed with a payment method that does support authorizations, the order
    lines are set to this status. The money will only be transferred once a shipment is created for the order line.
    Currently only Klarna Pay Later uses this status.

    * The order has status ``authorized`` or ``shipping``.
    * Can transition to: ``shipping`` or ``canceled``.

.. _orderline-status-shipping:

``shipping``
^^^^^^^^^^^^
    The order line will move into this status when you ship only a part of the order line. If you ship the complete
    order line, the status will move to ``completed`` immediately.

    * The order has status ``shipping``.
    * Can transition to: ``completed``.

.. _orderline-status-completed:

``completed``
^^^^^^^^^^^^^
    When the order line is completely shipped, it will get this status. The order line will also get this status when it
    is partially shipped and the rest of the line is ``canceled`` or ``refunded``.

    * The order has status ``shipping`` or ``completed``.
    * This is a final state, the order line can't transition to another state.

.. _orderline-status-canceled:

``canceled``
^^^^^^^^^^^^
    When the complete order line is canceled, the line gets this status. If only part of the order line is canceled, the
    status will stay at its previous status. Only merchants can cancel orders and order lines, the consumer can't do
    this.

    * The order has status ``authorized``, ``shipping``, ``completed``, ``expired`` or ``canceled``.
    * This is a final state, the order line can't transition to another state.

.. _orderline-status-refunded:

``refunded``
^^^^^^^^^^^^
    When an order line has status ``paid`` and is completely canceled, the order line will be set to this status.

    This is only possible for payment methods that don't support captures. If the payment does support captures, the
    order line would have been in status ``authorized`` and canceling would cause it to go to status ``canceled``.

    .. note:: This status is *not* used when you refund order lines after you have shipped them. In that case the status
              will stay at ``completed``.

    * The order has status ``completed`` or ``refunded``.
    * This is a final state, the order line can't transition to another state.
