import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";

interface InterfaceDynamicsCardProps {
  totalQuotes: number;
  totalContacts: number;
  totalUsers: number;
}

export function InterfaceDynamicsCard({ totalQuotes, totalContacts, totalUsers }: InterfaceDynamicsCardProps) {
  const quotesValue = totalQuotes || 0;
  const contactsValue = totalContacts || 0;
  const total = quotesValue + contactsValue;

  const data = [
    { name: "Quotes", value: quotesValue, color: "#C3110C" },
    { name: "Contacts", value: contactsValue, color: "#1E293B" },
  ];

  const quotesPercent = total > 0 ? Math.round((quotesValue / total) * 100) : 0;
  const contactsPercent = total > 0 ? Math.round((contactsValue / total) * 100) : 0;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-6">Quotes vs Contacts</h2>

        <div className="h-44 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={75} paddingAngle={3} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <Label value={totalUsers.toLocaleString()} position="center" className="font-black text-gray-800 text-xl" fill="#1E293B" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-[57%] left-1/2 -translate-x-1/2 text-[9px] font-bold text-gray-400 block text-center">
            Total Users
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 text-[13px] font-semibold text-gray-500 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C3110C]"></span>
          <span>Quotes {quotesPercent}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E293B]"></span>
          <span>Contacts {contactsPercent}%</span>
        </div>
      </div>
    </div>
  );
}
