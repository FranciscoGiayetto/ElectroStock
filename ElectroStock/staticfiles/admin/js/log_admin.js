(function($) {
  $(document).ready(function() {
    console.log('El código JavaScript se está ejecutando correctamente.');

    var statusField = $('#id_status');
    var lenderField = $('#id_lender');
    var dateOutField = $('#id_dateOut');
    var optionsToShow = ['AP', 'DAP', 'CARRITO', 'PEDIDO', 'DEV', 'VEN', 'TAR', 'ROT'];

    function toggleFieldsVisibility() {
      var selectedStatus = statusField.val();
      if (optionsToShow.includes(selectedStatus)) {
        lenderField.closest('.form-row').show();
        dateOutField.closest('.form-row').show();
      } else {
        lenderField.closest('.form-row').hide();
        dateOutField.closest('.form-row').hide();
      }
    }

    function handleStatusChange() {
      toggleFieldsVisibility();
    }

    // Oculta el campo "lender" al cargar la página si el estado seleccionado es "COMPRADO"
    if (statusField.val() === 'COM') {
      lenderField.closest('.form-row').hide();
      dateOutField.closest('.form-row').hide();
    }

    // Actualiza la visibilidad de los campos al cambiar el valor del filtro desplegable
    statusField.on('change', handleStatusChange);

    // Llama a la función handleStatusChange al cargar la página y cuando cambie el combo box
    statusField.closest('form').on('change', 'input[name="_save"]', handleStatusChange);
    handleStatusChange();
  });
})(django.jQuery);
