import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

export default function UserDialog({ open, setOpen, onSave }: any) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-106.25 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-slate-50">Tambah Pengguna</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="dark:text-slate-300">Nama Lengkap</Label>
            <Input 
              id="name" 
              className="bg-transparent border-gray-200 dark:border-slate-700 dark:text-white focus:ring-blue-500" 
              placeholder="Masukkan nama..."
            />
          </div>
          {/* Ulangi untuk Email dan Role */}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="dark:border-slate-700">
            Batal
          </Button>
          <Button onClick={() => onSave({})} className="bg-blue-600 hover:bg-blue-700 text-white">
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}