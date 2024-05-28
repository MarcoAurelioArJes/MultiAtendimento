namespace MultiAtendimento.API.Models
{
    public class Cliente : BaseModel
    {
        public string Nome { get; set; }
        public Setor Setor { get; set; }
        public Empresa Empresa { get; set; }
        public DateTime DataCadastro { get; set; }
    }
}
