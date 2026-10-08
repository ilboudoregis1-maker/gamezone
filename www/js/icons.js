const P={
logo:'<circle cx="12" cy="12" r="9"/><path d="M12 6l1.8 4.2 4.2.4-3.2 2.8 1 4.2L12 15.4 8.2 17.6l1-4.2L6 10.6l4.2-.4z"/>',
play:'<path d="M7 4l13 8-13 8z"/>',
back:'<path d="M15 5l-7 7 7 7"/>',
trophy:'<path d="M8 4h8v5a4 4 0 01-8 0zM8 6H4v1a4 4 0 004 4M16 6h4v1a4 4 0 01-4 4M12 13v4M8 20h8"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
users:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5a3 3 0 010 6M18 14c2 .6 3 2.4 3 6"/>',
mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>',
send:'<path d="M4 12l16-8-6 16-3-7z"/>',
close:'<path d="M6 6l12 12M18 6L6 18"/>',
volume:'<path d="M4 9v6h4l5 4V5L8 9zM17 9a4 4 0 010 6"/>',
resume:'<path d="M4 4v6h6M5 14a8 8 0 108-8 8 8 0 00-6 3"/>',
g0:'<circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/>',
grid:'<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
orbit:'<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)"/>',
drum:'<ellipse cx="12" cy="8" rx="8" ry="3"/><path d="M4 8v8c0 1.7 3.6 3 8 3s8-1.3 8-3V8M9 4L6 1M15 4l3-3"/>',
maze:'<path d="M4 4h16v16H4zM4 10h10M10 14h10M14 4v6M10 14v6"/>',
shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/>',
wave:'<path d="M2 12c2-6 4-6 6 0s4 6 6 0 4-6 8 0"/>',
bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
dice:'<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="15" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="9" cy="15" r="1"/>',
diamond:'<path d="M12 2l9 10-9 10L3 12z"/><path d="M12 7l4.5 5-4.5 5-4.5-5z"/>'
};
function icon(n,c){return '<svg class="ic '+(c||'')+'" viewBox="0 0 24 24">'+P[n]+'</svg>'}
document.getElementById('logo').innerHTML='<span style="font-size:38px;color:#FCD116;display:block">'+icon('logo')+'</span>';
