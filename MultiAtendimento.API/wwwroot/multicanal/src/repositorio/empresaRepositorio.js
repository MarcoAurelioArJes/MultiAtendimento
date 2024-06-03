import apiService from "./apiService";

const baseEndpoint = "empresa"
export default {        
    async criar(objetoUsuario) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/registrar`, verboHttp: "POST", body: objetoUsuario})

        let resultado = await apiService.resposta(respostaHttp);
        if (!respostaHttp.ok) {
            throw new Error(resultado.title)
        }
    }
}