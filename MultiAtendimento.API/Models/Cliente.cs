namespace MultiAtendimento.API.Models
{
    public class Cliente : BaseModel
    {
        public string Nome { get; set; }
        public Empresa Empresa { get; set; }
    }
}
