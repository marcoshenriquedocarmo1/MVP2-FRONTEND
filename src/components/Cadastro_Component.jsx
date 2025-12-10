
import React, { useState } from "react";
import FormField from "./FormField";
import "./Cadastro.css";

function isEmpty(v) {
  return !v || v.trim().length === 0;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// Aceita 10 ou 11 dígitos (BR), ignorando caracteres não numéricos
function phoneValid(v) {
  const digits = (v || "").replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 11;
}

export default function Cadastro() {
  const [values, setValues] = useState({ nome: "", telefone: "", email: "" });
  const [errors, setErrors] = useState({ nome: "", telefone: "", email: "" });
  const [status, setStatus] = useState({}); // nome|telefone|email -> 'valid'|'invalid'

  // Atualiza valores (sem pintar de verde até o blur)
  function handleChange(field) {
    return (e) => {
      const v = e.target.value;
      setValues((prev) => ({ ...prev, [field]: v }));
      if (!isEmpty(v)) {
        // limpamos mensagem enquanto digita, borda verde só no blur
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };
  }

  // Validação campo a campo (no blur e no submit)
  function validateField(field) {
    const v = values[field];

    if (isEmpty(v)) {
      setErrors((prev) => ({ ...prev, [field]: "Campo obrigatório." }));
      setStatus((prev) => ({ ...prev, [field]: "invalid" }));
      return false;
    }

    if (field === "email" && !emailRegex.test(v)) {
      setErrors((prev) => ({ ...prev, [field]: "E-mail inválido." }));
      setStatus((prev) => ({ ...prev, [field]: "invalid" }));
      return false;
    }

    if (field === "telefone" && !phoneValid(v)) {
      setErrors((prev) => ({ ...prev, [field]: "Telefone inválido (use 10–11 dígitos)." }));
      setStatus((prev) => ({ ...prev, [field]: "invalid" }));
      return false;
    }

    setErrors((prev) => ({ ...prev, [field]: "" }));
    setStatus((prev) => ({ ...prev, [field]: "valid" }));
    return true;
  }

  function handleBlur(field) {
    return () => validateField(field);
  }

  // Submit: valida todos; se ok, alerta e reseta
  function handleSubmit(e) {
    e.preventDefault();
    const okNome = validateField("nome");
    const okTel = validateField("telefone");
    const okMail = validateField("email");

    if (okNome && okTel && okMail) {
      alert("Cadastrado com sucesso!");
      setValues({ nome: "", telefone: "", email: "" });
      setErrors({ nome: "", telefone: "", email: "" });
      setStatus({});
    }
  }

  return (
    <div className="page">
      <main className="card" role="region" aria-labelledby="cadastro-title">
        <header className="card__header">
          <h1 id="cadastro-title" className="card__title">Cadastro</h1>
          <p className="card__subtitle">Preencha seus dados abaixo. Todos os campos são obrigatórios.</p>
        </header>

        <section className="card__body">
          <form onSubmit={handleSubmit} noValidate>
            <FormField
              id="nome"
              label="Nome"
              placeholder="Ex.: Ana Silva"
              value={values.nome}
              onChange={handleChange("nome")}
              onBlur={handleBlur("nome")}
              error={errors.nome}
              status={status.nome}
              autoComplete="given-name"
              inputMode="text"
            />

            <div className="form-row form-row--two">
              <FormField
                id="telefone"
                label="Telefone"
                type="tel"
                placeholder="(99) 99999-9999"
                value={values.telefone}
                onChange={handleChange("telefone")}
                onBlur={handleBlur("telefone")}
                error={errors.telefone}
                status={status.telefone}
                autoComplete="tel"
                inputMode="tel"
              />
              <FormField
                id="email"
                label="E-mail"
                type="email"
                placeholder="voce@exemplo.com"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
                status={status.email}
                autoComplete="email"
                inputMode="email"
              />
            </div>

            <div className="actions">
              <button type="submit" className="btn">Cadastrar</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
