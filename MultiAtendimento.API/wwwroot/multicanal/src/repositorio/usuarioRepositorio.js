import apiService from "./apiService";

const baseEndpoint = "usuario"
export default {
    async entrar(objetoUsuario) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/entrar`, verboHttp: "POST", body: objetoUsuario})
        let resultado = await apiService.resposta(respostaHttp);

        if (!respostaHttp.ok)
            throw new Error(resultado.mensagemDeErro)

        return resultado;
    },
    async criar(objetoUsuario) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/criar`, verboHttp: "POST", body: objetoUsuario})

        let resultado = await apiService.resposta(respostaHttp);

        if (!respostaHttp.ok) {
        validaCampos.defineCampoDeErroDaApi.bind(this)({nomePropriedade: resultado.value.nomePropriedade, 
            mensagem: resultado.value.mensagemErro});
        }
    },
    async obterUsuarios() {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/obterUsuarios`, verboHttp: "GET"})
        
        let respostaBody = await apiService.resposta(respostaHttp);
        
        //if (!respostaHttp.ok) throw new Error(respostaBody);

        return respostaBody;
    },
    async obterPorId(id) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/obterUsuarios/${id}`, verboHttp: "GET"});
        
        if (!respostaHttp.ok) mensagensDeErro.mensagensDeErro(dadosRetornados.value);

        let resultado = await apiService.resposta(respostaHttp);      
        
        return resultado;
    },
    async atualizar(id, objetoUsuario) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/atualizar/${id}`, verboHttp: "PUT", body: objetoUsuario})

        let resultado = await apiService.resposta(respostaHttp);
        
        if (!respostaHttp.ok) {
            validaCampos.defineCampoDeErroDaApi.bind(this)({nomePropriedade: resultado.value.nomePropriedade, 
                mensagem: resultado.value.mensagemErro});
        }
    }
    // ,
    // async deletar(id) {
    //     return await apiService.requisicao({endpoint: ``, verboHttp: "DELETE"});
    // }
}