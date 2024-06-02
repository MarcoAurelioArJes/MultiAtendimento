using MultiAtendimento.API.Models.Enums;

namespace MultiAtendimento.API.Models
{
    public class Cargo : BaseModel
    {
        public string Nome { get; set; }
        public NivelCargoEnum Nivel { get; set; }
    }
}
