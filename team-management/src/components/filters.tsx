import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomInput from "./customInput";
import { useState } from "react";
import { getUsers } from "@/utils/userService";

type Props = {
  search: string;
  setSearch: (v: string) => void;

  filterStatus: string;
  setFilterStatus: (v: string) => void;

  filterPriority: string;
  setFilterPriority: (v: string) => void;

  filterUser: string;
  setFilterUser: (v: string) => void;

  fromDate: string;
  setFromDate: (v: string) => void;

  toDate: string;
  setToDate: (v: string) => void;
};

function FilterDialog({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  filterUser,
  setFilterUser,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: Props) {
  const users = getUsers();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border border-subtle bg-transparent py-5 px-10 rounded-2xl">
          Filter
        </Button>
      </DialogTrigger>

      <DialogContent className="space-y-3 border border-subtle rounded-3xl bg-sidebar">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>

        <CustomInput
          className="rounded-2xl bg-[#1E1E1E] font-light border-subtle py-6 focus-visible:ring-[#1E1E1E] transition-all"
          placeholder="Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-2xl w-full bg-[#1E1E1E] font-light border-subtle border py-3 px-2 focus-visible:ring-[#1E1E1E] transition-all"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          className="outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-2xl w-full bg-[#1E1E1E] font-light border-subtle border py-3 px-2 focus-visible:ring-[#1E1E1E] transition-all"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          className="outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-2xl w-full bg-[#1E1E1E] font-light border-subtle border py-3 px-2 focus-visible:ring-[#1E1E1E] transition-all"
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
        >
          <option value="">All Users</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="date"
            className="outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-2xl w-full bg-[#1E1E1E] font-light border-subtle border py-3 px-2 focus-visible:ring-[#1E1E1E] transition-all"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <input
            type="date"
            className="outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-2xl w-full bg-[#1E1E1E] font-light border-subtle border py-3 px-2 focus-visible:ring-[#1E1E1E] transition-all"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <Button
          variant="secondary"
          onClick={() => {
            setSearch("");
            setFilterStatus("");
            setFilterPriority("");
            setFilterUser("");
            setFromDate("");
            setToDate("");
          }}
        >
          Clear Filters
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default FilterDialog;
