import { CheckCircle2 } from 'lucide-react';
import { FormData } from '../../types';
import { functionalFeatures, accessoriesList } from '../../data/mockData';
import { getBrandById, getModelById } from '../../services/dataService';
import { Card } from '../ui/Card';
import { memo } from 'react';

interface Step4ReviewProps {
  formData: FormData;
}

export const Step4Review = memo(function Step4Review({ formData }: Step4ReviewProps) {
  const brand = getBrandById(formData.brand_id);
  const model = getModelById(formData.model_id);

  const conditionLabels: { [key: string]: string } = {
    mulus: 'Mulus',
    normal: 'Normal',
    ada_dent: 'Ada Dent',
    pecah: 'Pecah'
  };

  const categoryLabels: { [key: string]: string } = {
    hp_flagship: 'HP Flagship',
    laptop: 'Laptop',
    komputer: 'Komputer'
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200 rounded-2xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Ringkasan Pengajuan
            </h3>
            <p className="text-sm text-slate-600">
              Periksa kembali informasi Anda sebelum mengirim
            </p>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4 pb-3 border-b border-slate-200">
          Informasi Perangkat
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600">Kategori</span>
            <span className="font-medium text-slate-900">{categoryLabels[formData.category as string]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Merek</span>
            <span className="font-medium text-slate-900">{brand?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Model</span>
            <span className="font-medium text-slate-900">{model?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Tahun Rilis</span>
            <span className="font-medium text-slate-900">{formData.year_released}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Kondisi Fisik</span>
            <span className="font-medium text-slate-900">{conditionLabels[formData.physical_condition as string]}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4 pb-3 border-b border-slate-200">
          Fungsi & Aksesoris
        </h4>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-600 mb-2">Fungsi yang Bekerja:</p>
            <div className="flex flex-wrap gap-2">
              {formData.functional_features.map(f => {
                const feature = functionalFeatures.find(ff => ff.value === f);
                return (
                  <span key={f} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                    {feature?.label}
                  </span>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-2">Aksesoris:</p>
            <div className="flex flex-wrap gap-2">
              {formData.accessories.length > 0 ? (
                formData.accessories.map(a => {
                  const accessory = accessoriesList.find(ac => ac.value === a);
                  return (
                    <span key={a} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {accessory?.label}
                    </span>
                  );
                })
              ) : (
                <span className="text-slate-500 text-sm">Tidak ada</span>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4 pb-3 border-b border-slate-200">
          Foto Perangkat
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {formData.photoUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Photo ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg border-2 border-slate-200"
            />
          ))}
        </div>
        <p className="text-sm text-slate-500 mt-3">
          Total {formData.photos.length} foto
        </p>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4 pb-3 border-b border-slate-200">
          Informasi Kontak
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600">Nama</span>
            <span className="font-medium text-slate-900">{formData.full_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">WhatsApp</span>
            <span className="font-medium text-slate-900">{formData.whatsapp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Email</span>
            <span className="font-medium text-slate-900">{formData.email}</span>
          </div>
          <div>
            <span className="text-slate-600 block mb-1">Alamat:</span>
            <p className="font-medium text-slate-900 text-sm">{formData.full_address}</p>
          </div>
          {formData.location_lat && formData.location_lng && (
            <div>
              <span className="text-slate-600 block mb-1">Koordinat:</span>
              <p className="text-sm text-slate-700">
                {formData.location_lat.toFixed(6)}, {formData.location_lng.toFixed(6)}
              </p>
            </div>
          )}
        </div>
      </Card>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-sm text-slate-700">
          Dengan menekan tombol <strong>Submit</strong>, Anda menyetujui{' '}
          <a href="#" className="text-emerald-600 hover:underline">Kebijakan Privasi</a> dan{' '}
          <a href="#" className="text-emerald-600 hover:underline">Syarat & Ketentuan</a> kami.
        </p>
      </div>
    </div>
  );
});
