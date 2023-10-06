// Classe que representa um erro personalizado para a aplicação
class AppError {
    // Propriedades da classe
    message; // Mensagem de erro
    statusCode; // Código de status HTTP

    // Construtor da classe
    constructor(message, statusCode = 400) {
        // Inicializa as propriedades da classe com os valores fornecidos
        this.message = message;
        this.statusCode = statusCode;
    }
}

// Exporta a classe AppError para ser utilizada em outros módulos
module.exports = AppError;
