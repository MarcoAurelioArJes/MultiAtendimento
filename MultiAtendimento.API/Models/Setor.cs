﻿namespace MultiAtendimento.API.Models
{
    public class Setor : BaseModel
    {
        public string Nome { get; set; }
        public Empresa Empresa { get; set; }
    }
}
