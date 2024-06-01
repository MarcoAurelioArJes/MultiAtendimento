using MultiAtendimento.API.Models.Enums;

namespace MultiAtendimento.API.Models.DTOs
{
    public class EntrarView
    {
        public string TokenDeAcesso { get; set; }
        public string TipoDoToken { get; set; }
        public DateTime ExpiraEm { get; set; }
    }
}
