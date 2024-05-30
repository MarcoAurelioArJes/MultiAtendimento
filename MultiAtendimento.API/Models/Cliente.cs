namespace MultiAtendimento.API.Models
{
    public class Cliente : BaseModel
    {
        public string Nome { get; set; }
        public Setor Setor { get; set; } = new Setor();
    }
}
