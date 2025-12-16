"use client";
import { useEffect, useState } from "react";

/**
 * All 404 messages are Base64 encoded to keep them semi-hidden,
 * because this is an open source project and we want the
 * messages to remain a fun little easter egg while still keeping it open and transparent.
 *
 * Decode them with atob() in your browser console if you really want them.
 * But please keep them a secret!
 */

const randomText = ['T29wcyEgVGhpcyBwYWdlIHdlbnQgb24gdmFjYXRpb24=','NDA0OiBQYWdlIGlzIHNsZWVwaW5n','V2VsbCwgdGhpcyBpcyBhd2t3YXJk','V2UgbG9va2VkIGV2ZXJ5d2hlcmUsIGJ1dCBjb3VsZG4ndCBmaW5kIGl0','QXJlIHlvdSBzdXJlIHlvdSB0eXBlZCB0aGUgcmlnaHQgVVJMPw==','VGhpcyBwYWdlIHJhbiBhd2F5IHdpdGggdGhlIGNvb2tpZXM=','RXJyb3IgNDA0OiBVbmljb3JucyBhdGUgdGhpcyBwYWdl','SG91c3Rvbiwgd2UgaGF2ZSBhIG1pc3NpbmcgcGFnZQ==','SXQncyBub3QgeW91LCBpdCdzIHRoaXMgcGFnZQ==','TG9zdCBpbiBzcGFjZSwgb3IgbWF5YmUganVzdCB0aGUgaW50ZXJuZXQ=','VGhpcyBwYWdlIGlzIHBsYXlpbmcgaGlkZSBhbmQgc2Vlaw==','TG9va3MgbGlrZSBzb21lb25lIHN0b2xlIHRoaXMgcGFnZQ==','UGFnZSBub3QgZm91bmQuIEJ1dCBoZXJlJ3MgYSBqb2tlIGluc3RlYWQ6IFdoeSBkaWQgdGhlIGRldmVsb3BlciBnbyBicm9rZT8gQmVjYXVzZSBoZSB1c2VkIHVwIGFsbCBoaXMgY2FjaGU=','NDA0OiBUaGUgcGFnZSB5b3UncmUgbG9va2luZyBmb3IgaXMgY3VycmVudGx5IG5hcHBpbmc=','WW91J3ZlIHJlYWNoZWQgdGhlIEJlcm11ZGEgVHJpYW5nbGUgb2YgdGhlIHdlYg==','VGhlIHBhZ2UgeW91J3JlIGxvb2tpbmcgZm9yIGhhcyBiZWVuIGFiZHVjdGVkIGJ5IGFsaWVucw==','UGFnZSByYW4gb2ZmIHRvIGpvaW4gYSByb2NrIGJhbmQ=','U29tZW9uZSBzZW50IHRoaXMgcGFnZSB0byB0aGUgU2hhZG93IFJlYWxt','VGhpcyBwYWdlIGlzIG9uIGEgcXVlc3QgdG8gZmluZCB0aGUgT25lIFBpZWNl','UGFnZSBiZWNhbWUgYSBQb2tlbW9uLCBnb3R0YSBjYXRjaCBpdCBhbGwh','VGhpcyBwYWdlIGlzIHdhaXRpbmcgZm9yIHRoZSBQUiB0byBiZSBhcHByb3ZlZA==','UGFnZSBub3QgZm91bmQuIEl0J3MgcHJvYmFibHkgY29tbWVudGVkIG91dC4=','VGhpcyBwYWdlIGhhcyBiZWVuIGJ1ZmZlcmluZyBzaW5jZSAyMDA5','UGFnZSBiZWNhbWUgYSBSaWNrcm9sbCBuZXZlciBnb25uYSBnaXZlIHlvdSB1cA==','T29wcyEgUGFnZSBpcyB3YXRjaGluZyBsaXZlIGNhbXMgb2YgYWJhbmRvbmVkIFJ1c3NpYW4gbWFsbHM=','UGFnZSBiZWNhbWUgMjAlIGNvb2xlciBhbmQgdmFuaXNoZWQ=','UGFnZSByYW4gb2ZmIHRvIGpvaW4gdGhlIFdvbmRlcmJvbHRz']

export default function DashboardNotFound() {
  const [randomMessage, setRandomMessage] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * randomText.length);
      setRandomMessage(atob(randomText[randomIndex]));
    }, 0);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2 text-center">
      <h1 className="text-2xl font-semibold">Page not found.</h1>
      <p className="text-muted-foreground">{randomMessage}</p>
    </div>
  );
}
