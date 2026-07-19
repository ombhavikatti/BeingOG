"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateHabit } from "@/hooks/use-habits";
import { ApiRequestError } from "@/lib/api/client";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(120, "Name too long"),
  description: z.string().max(500, "Description too long").optional(),
  target: z.coerce.number().int().min(1).max(100).optional(),
});

type FormValues = z.infer<typeof schema>;

const ICONS = ["🎯", "💻", "📚", "🏋️", "🧘", "✍️", "🎨", "🌱", "💧", "🔥"];
const COLORS = [
  "#4F46E5",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
];

export function CreateHabitDialog() {
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const createHabit = useCreateHabit();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", description: "", target: 1 },
  });

  async function onSubmit(values: FormValues) {
    try {
      await createHabit.mutateAsync({
        name: values.name,
        description: values.description || undefined,
        icon: selectedIcon,
        color: selectedColor,
        target: values.target ?? 1,
      });

      toast.success("Habit created 🎯", {
        description: `You're now tracking "${values.name}".`,
      });

      reset();
      setSelectedIcon(ICONS[0]);
      setSelectedColor(COLORS[0]);
      setOpen(false);
    } catch (err) {
      const message =
        err instanceof ApiRequestError
          ? err.displayMessage
          : "Something went wrong. Please try again.";
      toast.error("Couldn't create habit", { description: message });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add habit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-tight">
            Create a habit
          </DialogTitle>
          <DialogDescription>
            Start small. Build compound wins.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name">Habit name</Label>
            <Input
              id="name"
              placeholder="e.g. Daily DSA practice"
              autoComplete="off"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-danger-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="flex justify-between">
              <span>Description</span>
              <span className="text-xs text-text-muted">optional</span>
            </Label>
            <Input
              id="description"
              placeholder="Solve 3 LeetCode problems every day"
              autoComplete="off"
              {...register("description")}
            />
          </div>

          <div className="space-y-2">
            <Label>Icon</Label>
            <div className="grid grid-cols-10 gap-1.5">
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setSelectedIcon(icon)}
                  className={cn(
                    "aspect-square rounded-lg border text-lg transition-all",
                    selectedIcon === icon
                      ? "border-primary-500 bg-primary-500/10 scale-105"
                      : "border-border bg-surface hover:bg-surface-elevated",
                  )}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="grid grid-cols-8 gap-1.5">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "aspect-square rounded-lg border-2 transition-all",
                    selectedColor === color
                      ? "border-text-primary scale-110"
                      : "border-transparent hover:scale-105",
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="target">Daily target</Label>
            <Input
              id="target"
              type="number"
              min={1}
              max={100}
              {...register("target")}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Create habit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}