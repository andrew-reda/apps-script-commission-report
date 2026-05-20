// ============================================================
//  CONFIGURATION — change SHEET_NAME to match your tab name
// ============================================================
const SHEET_NAME = "Sheet1";

function doGet() {
  return HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setTitle("Executive Commission Report")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getDashboardData() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return { error: "Sheet '" + SHEET_NAME + "' not found." };

  const [headers, ...rows] = sheet.getDataRange().getValues();
  const idx = {};
  headers.forEach((h, i) => idx[String(h).trim()] = i);

  const parseMoney = v => {
    if (v === null || v === "") return 0;
    return parseFloat(String(v).replace(/[$,\s]/g, "")) || 0;
  };

  const records = rows.map(r => ({
    agent:        String(r[idx["Agent Name"]]        || "").trim(),
    carrier:      String(r[idx["Carrier"]]            || "").trim(),
    planType:     String(r[idx["Plan Type"]]          || "").trim(),
    commAction:   String(r[idx["Commission Action"]]  || "").trim(),
    classif:      String(r[idx["Classification"]]     || "").trim(),
    clientName:   String(r[idx["Client Full Name"]] || "").trim(),
    termDate:     String(r[idx["Termination Date"]]   || "").trim(),
    termReason:   String(r[idx["Termination Reason"]] || "").trim(),
    durMonths:    parseFloat(r[idx["Duration Months"]]) || 0,
    commission:   parseMoney(r[idx["Commission"]]),
    agentPayroll: parseMoney(r[idx["Agent Payroll"]]),
  }));

  const agg = (arr, key) => {
    const m = {};
    arr.forEach(r => { const k=r[key]||"Unknown"; m[k]=(m[k]||0)+r.commission; });
    return Object.entries(m).sort((a,b)=>b[1]-a[1]).map(([k,v])=>({label:k,value:v}));
  };

  // KPIs
  const total         = records.reduce((s,r)=>s+r.commission, 0);
  const totalPayroll  = records.reduce((s,r)=>s+r.agentPayroll, 0);
  const revLeakage    = records.filter(r=>r.commission<0).reduce((s,r)=>s+r.commission, 0);
  const newBizCount   = records.filter(r=>r.classif==="Advance").length;
  const uniqueClients = new Set(records.map(r => r.clientName).filter(Boolean)).size;

  // Classification mix
  const classifMap = {};
  records.forEach(r=>{ const c=r.classif||"Unknown"; classifMap[c]=(classifMap[c]||0)+1; });

  // Filter metadata
  const agents   = [...new Set(records.map(r=>r.agent))].filter(Boolean).sort();
  const carriers = [...new Set(records.map(r=>r.carrier))].filter(Boolean).sort();
  const classifs = [...new Set(records.map(r=>r.classif))].filter(Boolean).sort();

  return {
    meta: { total, totalPayroll, revLeakage, newBizCount, uniqueClients },
    byCarrier:   agg(records,"carrier").slice(0,14),
    byAgent:     agg(records,"agent").slice(0,20),
    classifMix:  Object.entries(classifMap).sort((a,b)=>b[1]-a[1]).map(([k,v])=>({label:k,value:v})),
    filters:     { agents, carriers, classifs },
    rawRecords:  records
  };
}
