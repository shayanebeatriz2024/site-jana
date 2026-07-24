import "dotenv/config";
import { getAvailableSlots, formatSlotsForWhatsApp } from "../src/calendar.js";

// Teste rápido de ponta a ponta da busca de horários:
//   cd automation && npm run teste:horarios
const procedimento = process.argv[2] || "Design de Sobrancelhas";

const slots = await getAvailableSlots({ procedimento, dias: 14 });
console.log(`\nProcedimento: ${procedimento}`);
console.log(`Slots encontrados: ${slots.length}\n`);
console.log(formatSlotsForWhatsApp(slots));
