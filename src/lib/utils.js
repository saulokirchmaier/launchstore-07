//Função para tratar a idade do instrutor
module.exports = {
    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getFullYear()
        const month = `0${date.getMonth() + 1}`.slice(-2)
        const day = `0${date.getDate()}`.slice(-2)
        const hour = date.getHours()
        const minutes = date.getMinutes()
        
        //enviar no formato yyyy-mm-dd
        return {
            day,
            month,
            year,
            hour,
            minutes,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },

    formatPrice(price) {
        // Formatação para real
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency', // 1.000,00
            currency: 'BRL' // R$
        }).format(price/100) //dividir por 100 por causa da expressao regular
    },

    formatCpfCnpj(value) {
        value = value.replace(/\D/g,"")

        if ( value.length > 14 )
            value = value.slice(0, -1)

        // Checa se é cnpj - 11.222.333/0001-00
        if ( value.length > 11 ) {

            value = value.replace(/(\d{2})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1/$2")
            value = value.replace(/(\d{4})(\d)/, "$1-$2")

        } else {
            // cpf - 111.222.333-44
           value = value.replace(/(\d{3})(\d)/, "$1.$2")
           value = value.replace(/(\d{3})(\d)/, "$1.$2")
           value = value.replace(/(\d{3})(\d)/, "$1-$2")
        }

        return value
    },

    formatCep(value) {
        value = value.replace(/\D/g,"")

        if ( value.length > 8 ) 
            value = value.slice(0, -1)
        
        value = value.replace(/(\d{5})(\d)/, "$1-$2")
        
        return value
    }
}

    