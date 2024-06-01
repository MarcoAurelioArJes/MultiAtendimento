using System.ComponentModel.DataAnnotations.Schema;

namespace MultiAtendimento.API.Models
{
    public class Mensagem : BaseModel
    {
        public DateTime DataEHora { get; set; }
        public string Conteudo { get; set; }

        [ForeignKey(nameof(Empresa))]
        public string EmpresaCnpj { get; set; }
        [ForeignKey(nameof(Chat))]
        public int ChatId { get; set; }
        [ForeignKey(nameof(Atendente))]
        public int AtendenteId { get; set; }
        [ForeignKey(nameof(Cliente))]
        public int ClienteId { get; set; }

        public Chat Chat { get; set; }
        public Usuario Atendente { get; set; }
        public Cliente Cliente { get; set; }
    }
}
