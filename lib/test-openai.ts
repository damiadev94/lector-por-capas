
import { openai, model } from "./open-ai";

async function main() {
  const response = await openai.responses.create({
    model,
    input: "Responde únicamente con esta palabra: OK",
    max_output_tokens: 300,
    reasoning: { effort: "low" },
  });

  console.log("Modelo:", model);
  console.log("Estado:", response.status);
  console.log("Respuesta:", JSON.stringify(response.output_text));
  console.log(
    "Motivo de finalización:",
    response.incomplete_details?.reason ?? "Ninguno",
  );
  console.log("Tokens:", response.usage?.total_tokens);
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exitCode = 1;
});
