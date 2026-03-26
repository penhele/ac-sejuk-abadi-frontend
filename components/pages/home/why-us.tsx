import { ShieldCheck, Zap, HeartHandshake, Award } from "lucide-react";

export default function WhyUs() {
  const features = [
    {
      title: "Teknisi Tersertifikasi",
      description: "Tim kami terdiri dari tenaga ahli yang memiliki sertifikasi resmi dari brand-brand AC terkemuka.",
      icon: <Award className="w-8 h-8 text-primary" />,
    },
    {
      title: "Layanan Cepat & Tepat",
      description: "Kami menghargai waktu Anda dengan memberikan respon dan pengerjaan yang efisien.",
      icon: <Zap className="w-8 h-8 text-primary" />,
    },
    {
      title: "Garansi Pekerjaan",
      description: "Setiap instalasi dan servis mendapatkan jaminan garansi nyata untuk ketenangan pikiran Anda.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    },
    {
      title: "Kepuasan Pelanggan",
      description: "Kami fokus pada hasil akhir yang memuaskan dan menjaga hubungan jangka panjang dengan klien.",
      icon: <HeartHandshake className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <section className="py-20 bg-slate-50 rounded-[4rem] px-8 sm:px-16 mb-16">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Mengapa Kami?</h2>
          <p className="text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.1] uppercase">
            Kami Memberikan <span className="text-primary italic">Standar Baru</span> dalam Layanan Pendingin Udara
          </p>
          <p className="text-slate-500 text-lg leading-relaxed">
            Lebih dari sekadar memasang AC, kami memberikan solusi kenyamanan udara yang sehat dan hemat energi untuk lingkungan Anda.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-primary transition-colors group">
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
