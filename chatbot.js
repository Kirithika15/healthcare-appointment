/* chatbot.js - Smart keyword-based replies (Type 2) */

/*
Usage:
- Include chatbot markup in each HTML (we provide examples)
- Include this script once per page:
    <script src="chatbot.js"></script>
- Click floating button to open chat. Type keywords and press Send.
*/

(function(){
  // Hard-coded keyword -> reply mapping (extend as needed)
  const KEYWORD_RULES = [
    {keys: ['fever','temperature','hot'], reply: "You may have a fever. Drink fluids, rest and monitor. If temperature is > 101°F or persists 2+ days, consult a doctor."},
    {keys: ['cough','cold','sore throat'], reply: "For cough or sore throat: keep hydrated, rest, and use warm saline gargles. Book an appointment if it gets worse."},
    {keys: ['headache','migraine','head'], reply: "Headache may be due to stress or dehydration. Drink water, rest, and consider paracetamol if suitable. Seek medical help if severe."},
    {keys: ['appointment','book','booking'], reply: "You can book an appointment on the Book Appointment page. Select department, choose a doctor and pick a date/time."},
    {keys: ['cancel','cancel appointment','delete'], reply: "To cancel an appointment, open View Appointments and click Cancel on the appointment you want to remove."},
    {keys: ['timings','hours','opening','open'], reply: "Our doctors are available from 9:00 AM to 8:00 PM, Monday to Saturday."},
    {keys: ['fees','price','cost'], reply: "Consultation fees start from ₹300 and vary by doctor; see appointment page or contact support for exact fees."},
    {keys: ['departments','department','speciality'], reply: "Available departments: Cardiology, Orthopedics, Dental, Neurology, Dermatology, General Medicine."}
  ];

  // Fallback message
  const FALLBACK = "Sorry, I don't fully understand. Try keywords: fever, cough, appointment, timings, fees, departments.";

  // Public API: get reply for a text
  window.getChatbotReply = function(text){
    const t = (text||'').toLowerCase();
    if(!t) return "Please type a question or keyword.";
    // try exact inclusion of any keyword
    for(const rule of KEYWORD_RULES){
      for(const k of rule.keys){
        if(t.includes(k)) return rule.reply;
      }
    }
    return FALLBACK;
  };
})();