let baseUrl = "http://localhost:9000"
export default {
        async requisicao({endpoint = "", verboHttp, body = {}}) {
            let corpoRequisicao = {
                method: verboHttp,
                headers: {
                    "Content-Type": "application/json"
                }
            }

            if (Object.keys(body).length > 0) corpoRequisicao.body = JSON.stringify(body);
            
            let respostaHttp = await fetch(`${baseUrl}/${endpoint}`, corpoRequisicao);
            return respostaHttp;
        },
        resposta: async function (requisicao) {
            return requisicao.headers.get("content-type") !== null ? await requisicao.json() : null;
        }
}