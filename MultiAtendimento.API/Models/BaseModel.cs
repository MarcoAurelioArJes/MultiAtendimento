using System.ComponentModel.DataAnnotations;

namespace MultiAtendimento.API.Models
{
    public class BaseModel
    {
        [Key]
        public int Id { get; set; }
        public Empresa Empresa { get; set; } = new Empresa();
        public DateTime DataCadastro { get; } = DateTime.Now;
    }
}
