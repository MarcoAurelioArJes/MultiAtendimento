﻿using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using MultiAtendimento.API.Models.DTOs;

namespace MultiAtendimento.API.Models.FiltersActionPersonalizados
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class ValidacaoDoObjetoPadrao : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {

        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.ModelState.IsValid)
                return;


            var retornoPadrao = new RetornoPadraoView<List<RetornoErroPadraoView>>
            {
                Mensagem = "Campos inválidos"
            };

            var errosRetornados = context.ModelState.Select(c => new RetornoErroPadraoView
            {
                Campo = c.Key,
                Mensagens = c.Value.Errors.Select(c => c.ErrorMessage).ToList()
            });

            retornoPadrao.Resultado = errosRetornados.ToList();
            context.Result = new BadRequestObjectResult(retornoPadrao);
            return;
        }
    }
}